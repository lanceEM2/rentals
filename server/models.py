from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class BaseProperty(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String)
    sale_type = db.Column(db.String)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    image = db.Column(db.String)
    property_category = db.Column(db.String)
    status = db.Column(db.String)
    agent_id = db.Column(db.Integer, db.ForeignKey('agent.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'location': self.location,
            'sale_type': self.sale_type,
            'price': self.price,
            'description': self.description,
            'image': self.image,
            'property_category': self.property_category,
            'status': self.status,
            'agent_id': self.agent_id,
        }

class Property(BaseProperty):
    __tablename__ = 'properties'

    bedroom = db.Column(db.Integer)
    bathroom = db.Column(db.Integer)
    agent = db.relationship('Agent', back_populates='properties')

    def to_dict(self):
        base_dict = super().to_dict()
        base_dict.update({
            'bedroom': self.bedroom,
            'bathroom': self.bathroom
        })
        return base_dict

class Land(BaseProperty):
    __tablename__ = 'lands'

    size = db.Column(db.String)
    agent = db.relationship('Agent', back_populates='lands')

    def to_dict(self):
        base_dict = super().to_dict()
        base_dict.update({
            'size': self.size
        })
        return base_dict

class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.String)

class Agent(db.Model, SerializerMixin):
    __tablename__ = 'agent'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    password = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String)
    description = db.Column(db.String)
    reviews = db.Column(db.Integer)
    zipcode = db.Column(db.String)
    no_of_properties = db.Column(db.Integer, default=0)  # Default value set to 0

    properties = db.relationship('Property', back_populates='agent', cascade='all, delete-orphan')
    lands = db.relationship('Land', back_populates='agent', cascade='all, delete-orphan')
    payments = db.relationship('Payment', back_populates='agent')

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'email': self.email,
            'description': self.description,
            'reviews': self.reviews,
            'zipcode': self.zipcode,
            'no_of_properties': self.no_of_properties,
            'properties': [property.to_dict() for property in self.properties],
            'lands': [land.to_dict() for land in self.lands],
            'payments': [payment.to_dict() for payment in self.payments]

        }

class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    agent_id = db.Column(db.Integer, db.ForeignKey('agent.id'))
    amount = db.Column(db.Float)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String, default='Pending')

    agent = db.relationship('Agent', back_populates='payments')

class TokenBlocklist(db.Model):
    __tablename__ = 'token_blocklist'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
