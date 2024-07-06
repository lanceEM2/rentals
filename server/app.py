#!usr/bin/env python3

from datetime import date, timedelta, datetime
from re import M
from flask import Flask, jsonify, request, make_response, abort
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity, get_jwt
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, Customer, Property, Agent, Land, Payment, TokenBlocklist

# configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///real.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = b'#\xab@\xcc\xa0\xb3E\xc3\xf4\x1a\\<&?\x91\xdb'
app.json.compact = False

# migrating app to db
migrate = Migrate(app, db)
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = b'\xae\xc765\xe5\x99\x03a\xdd\x92\t\x92\x9f\x1f\xe5\xb1'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1) # Adjust token expiration as needed
jwt = JWTManager(app)

# initializing app
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

# Creating JWT Tokens with User Type

def create_tokens(user, user_type):
    additional_claims = {'user_type': user_type}
    access_token = create_access_token(identity=user.id, additional_claims=additional_claims)
    return access_token


# customer/visitor signup

class CustomerSignup(Resource):

    def post(self):

        data = request.get_json()

        hashed_password = bcrypt.generate_password_hash(data['password'])

        new_customer = Customer(
            email = data['email'],
            password = hashed_password
        )

        customer = Customer.query.filter(Customer.email == new_customer.email).first()

        if customer is not None:
            response = make_response(
                jsonify({
                    "error": "This account exists!"
                }),
                409
            )

            return response

        db.session.add(new_customer)
        db.session.commit()

        access_token = create_tokens(new_customer, 'customer')

        return make_response(jsonify({'message': 'Customer signup successful'}), 201, {'Authorization': f'Bearer {access_token}'})

api.add_resource(CustomerSignup, "/auth/signup") 


# customer/visitor login

class CustomerLogin(Resource):

    def post(self):

        data = request.get_json()

        email = data['email']
        password = data['password']

        customer = Customer.query.filter_by(email=email).first()

        if customer and bcrypt.check_password_hash(customer.password, password):

            # Create the JWT token with an additional claim for user_type
            access_token = create_access_token(identity=customer.id, additional_claims={'user_type': 'customer'})

            return make_response(jsonify({'message': 'Customer login successful'}), 200, {'Authorization': f'Bearer {access_token}'})

        abort(401, 'Invalid username or password')

api.add_resource(CustomerLogin, '/auth/login')


# agent signup

class AgentSignup(Resource):

    def post(self):

        data = request.get_json()

        hashed_password = bcrypt.generate_password_hash(data['password'])

        new_agent = Agent(
            first_name = data['first_name'],
            last_name = data['last_name'],
            password = hashed_password,
            phone = data['phone'],
            email = data['email'],
            description = data['description'],
            reviews = data.get('reviews', 0),  # Default reviews to 0 if not provided
            zipcode = data['zipcode']
            # no_of_properties is not required as input
        )

        agent = Agent.query.filter(Agent.email == new_agent.email).first()

        if agent is not None:
            response = make_response(
                jsonify({
                    "error": "This account exists!"
                }),
                409
            )

            return response

        db.session.add(new_agent)
        db.session.commit()

        access_token = create_tokens(new_agent, 'agent')

        return make_response(jsonify({'message': 'Agent signup successful'}), 201, {'Authorization': f'Bearer {access_token}'})

api.add_resource(AgentSignup, "/agent/signup")


# agent login

class AgentLogin(Resource):

    def post(self):

        data = request.get_json()

        email = data['email']
        password = data['password']

        agent = Agent.query.filter_by(email=email).first()

        if agent and bcrypt.check_password_hash(agent.password, password):

            # Create the JWT token with an additional claim for user_type
            access_token = create_access_token(identity=agent.id, additional_claims={'user_type': 'agent'})

            return make_response(jsonify({'message': 'Agent login successful'}), 200, {'Authorization': f'Bearer {access_token}'})

        abort(401, 'Invalid username or password')

api.add_resource(AgentLogin, '/agent/login')


# function to enable signout
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    return token is not None

# everyone signout

class Signout(Resource):

    @jwt_required()
    def delete(self):
        jti = get_jwt()["jti"]  # JWT ID
        user_id = get_jwt_identity()

        # Add the token to the blocklist
        token = TokenBlocklist(jti=jti, created_at=datetime.utcnow())
        db.session.add(token)
        db.session.commit()

        return make_response(jsonify({'message': 'Successfully signed out'}), 200)

api.add_resource(Signout, '/signout')


# everyone logout

class Logout(Resource):

    @jwt_required()
    def delete(self):
        user_id = get_jwt_identity()
        # enter user_type manually
        user_type = request.json.get('user_type')

        if user_type == 'customer':
            user = Customer.query.get(user_id)
        elif user_type == 'agent':
            user = Agent.query.get(user_id)
        else:
            return make_response(jsonify({'error': 'Invalid user type'}), 400)

        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)

        db.session.delete(user)
        db.session.commit()

        response_dict = {'message': 'User data deleted successfully.'}
        return make_response(jsonify(response_dict), 200)

api.add_resource(Logout, '/logout')


class GetPropertyById(Resource):

    @jwt_required()
    def get(self, property_id):
        current_user_id = get_jwt_identity()
        agent = Agent.query.get(current_user_id)
        if not agent:
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)

        property = Property.query.filter_by(id=property_id, agent_id=current_user_id).first()
        if not property:
            return make_response(jsonify({'error': 'Property not found'}), 404)

        return make_response(jsonify(property.to_dict()), 200)

api.add_resource(GetPropertyById, '/agent/properties/<int:property_id>')


class GetLandById(Resource):

    @jwt_required()
    def get(self, land_id):
        current_user_id = get_jwt_identity()
        agent = Agent.query.get(current_user_id)
        if not agent:
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)

        land = Land.query.filter_by(id=land_id, agent_id=current_user_id).first()
        if not land:
            return make_response(jsonify({'error': 'Land not found'}), 404)

        return make_response(jsonify(land.to_dict()), 200)

api.add_resource(GetLandById, '/agent/lands/<int:land_id>')


# an agent to be able to add a new property or land in the system

class AgentNewPropertyOrLand(Resource):

    @jwt_required()
    def post(self):

        current_user_id = get_jwt_identity()
        agent = Agent.query.get(current_user_id)
        if not agent:
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)

        if agent.no_of_properties >= 2:
            return make_response(jsonify({'error': 'Payment required for adding more properties'}), 402)

        data = request.get_json()

        resource_type = data.get('resource_type')
        if resource_type not in ['property', 'land']:
            abort(400, 'Invalid resource type')

        location = data.get('location')
        price = data.get('price')
        sale_type = data.get('sale_type')
        description = data.get('description')
        image = data.get('image')
        property_category = data.get('property_category')
        status = data.get('status')

        if resource_type == 'property':
            bedroom = data.get('bedroom')
            bathroom = data.get('bathroom')

            new_resource = Property(
                location=location,
                bedroom=bedroom,
                bathroom=bathroom,
                price=price,
                sale_type=sale_type,
                description=description,
                image=image,
                property_category=property_category,
                status=status,
                agent_id=current_user_id
            )

        elif resource_type == 'land':
            size = data.get('size')

            new_resource = Land(
                location=location,
                size=size,
                price=price,
                sale_type=sale_type,
                description=description,
                image=image,
                property_category=property_category,
                status=status,
                agent_id=current_user_id
            )

        db.session.add(new_resource)
        agent.no_of_properties += 1  # Increment the agent's no_of_properties
        db.session.commit()

        return make_response(jsonify(new_resource.to_dict()), 201)

api.add_resource(AgentNewPropertyOrLand, '/resources/add')


# an agent to be able to update his/her property data or land data

class AgentUpdatePropertyOrLand(Resource):

    @jwt_required()
    def patch(self):

        current_user_id = get_jwt_identity()
        agent = Agent.query.get(current_user_id)
        if not agent:
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)

        data = request.get_json()

        resource_type = data.get('resource_type')
        resource_id = data.get('resource_id')
        if not resource_type or not resource_id:
            abort(400, 'resource_type and resource_id are required in the request')

        if resource_type == 'property':
            resource = Property.query.filter_by(id=resource_id, agent_id=current_user_id).first()
        elif resource_type == 'land':
            resource = Land.query.filter_by(id=resource_id, agent_id=current_user_id).first()
        else:
            abort(400, 'Invalid resource type')

        if not resource:
            abort(404, f'{resource_type.capitalize()} with id {resource_id} not found')

        for attr in data:
            if hasattr(resource, attr) and attr != 'id':
                setattr(resource, attr, data[attr])

        db.session.commit()

        response_dict = resource.to_dict()

        return make_response(jsonify(response_dict), 200)

api.add_resource(AgentUpdatePropertyOrLand, '/resources/update')


# an agent to be able to delete a property or land he/she owns

class AgentDeletePropertyOrLand(Resource):

    @jwt_required()
    def delete(self):

        current_user_id = get_jwt_identity()
        agent = Agent.query.get(current_user_id)
        if not agent:
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)

        data = request.get_json()

        resource_type = data.get('resource_type')
        resource_id = data.get('resource_id')
        if not resource_type or not resource_id:
            abort(400, 'resource_type and resource_id are required in the request')

        if resource_type == 'property':
            resource = Property.query.filter_by(id=resource_id, agent_id=current_user_id).first()
        elif resource_type == 'land':
            resource = Land.query.filter_by(id=resource_id, agent_id=current_user_id).first()
        else:
            abort(400, 'Invalid resource type')

        if not resource:
            abort(404, f'{resource_type.capitalize()} with id {resource_id} not found')

        db.session.delete(resource)
        agent.no_of_properties -= 1  # Decrement the agent's no_of_properties
        db.session.commit()

        response_dict = {"message": f"{resource_type.capitalize()} successfully deleted"}

        return make_response(jsonify(response_dict), 200)

api.add_resource(AgentDeletePropertyOrLand, '/resources/delete')


# an agent to be able to view his/her data(profile) included with properties and lands

class GetAgentData(Resource):

    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        agent = Agent.query.get(current_user_id)
        if not agent:
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)

        agent_data = agent.to_dict()

        return make_response(jsonify(agent_data), 200)

api.add_resource(GetAgentData, '/agent-data')


# an agent is able to update his/her data(profile)

class UpdateAgentData(Resource):

    @jwt_required()
    def patch(self):
        current_user_id = get_jwt_identity()
        agent = Agent.query.get(current_user_id)
        if not agent:
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)

        data = request.get_json()

        if not data:
            return make_response(jsonify({'error': 'No data provided'}), 400)

        for attr, value in data.items():
            if attr == 'password':
                value = bcrypt.generate_password_hash(value)
            if value and hasattr(agent, attr):  # Update only if the value is provided
                setattr(agent, attr, value)

        db.session.commit()

        response_dict = agent.to_dict()

        return make_response(jsonify(response_dict), 200)

api.add_resource(UpdateAgentData, '/agent-data/update') 


# agent payment 

class AgentPayment(Resource):

    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        agent = Agent.query.get(current_user_id)
        if not agent:
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)

        data = request.get_json()
        amount = data.get('amount')
        # Mock payment processing logic
        payment_status = 'Completed'

        new_payment = Payment(
            agent_id=current_user_id,
            amount=amount,
            status=payment_status
        )

        db.session.add(new_payment)
        db.session.commit()

        # Generate PDF after successful payment
        pdf_path = generate_payment_pdf(agent, new_payment)

        return make_response(jsonify({'message': 'Payment successful', 'pdf': pdf_path}), 201)

api.add_resource(AgentPayment, '/agent/payment')

def generate_payment_pdf(agent, payment):
    # Mock function to generate a PDF receipt
    # Use a library like ReportLab or WeasyPrint to generate the actual PDF
    pdf_path = f'receipts/payment_{payment.id}.pdf'
    with open(pdf_path, 'w') as f:
        f.write(f"Receipt for {agent.first_name} {agent.last_name}\n")
        f.write(f"Amount: {payment.amount}\n")
        f.write(f"Date: {payment.payment_date}\n")
        f.write(f"Status: {payment.status}\n")
    return pdf_path


# gets/fetches all properties and lands - to be viewed by everyone

class GetPropertiesAndLands(Resource):

    def get(self, resource_type):
        if resource_type == 'properties':
            resource_instances = Property.query.all()
        elif resource_type == 'lands':
            resource_instances = Land.query.all()
        else:
            abort(404, 'Invalid resource type')

        if not resource_instances:
            abort(404, f'No {resource_type.capitalize()} found')

        resource_data = [resource_instance.to_dict() for resource_instance in resource_instances]

        return make_response(jsonify(resource_data), 200)

api.add_resource(GetPropertiesAndLands, '/<string:resource_type>')        


# gets all agents in the system - to be viewed by admin

class GetAgents(Resource):

    def get(self):

        all_agents = Agent.query.all()
        if not all_agents:
            abort(404, 'No agents found')

        agents = []

        for agent_instance in all_agents:
            agent_data = agent_instance.to_dict()

            agents.append(agent_data)

        return make_response(jsonify(agents), 200)

api.add_resource(GetAgents, '/agents') 


if __name__ == '__main__':
    app.run(port=5555, debug=True)