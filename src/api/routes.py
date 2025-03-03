"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, origins=["https://bookish-couscous-69r79rx657w72rq6p-3000.app.github.dev"])

@api.route('/signup', methods=['POST'])
def handle_create_user():
    
    body = request.get_json()
    
    if body is None:
        return jsonify({'msg': 'Error'}), 400
    if "username" not in body: 
        return jsonify({'msg': 'Error'}), 400
    if "email" not in body: 
        return jsonify({'msg': 'Error'}), 400
    if "password" not in body: 
        return jsonify({'msg': 'Error'}), 400
    

    user = User()
    user.username = body["username"]
    user.email = body["email"]
    user.password = body["password"]

    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'user': user.username}), 201


@api.route('/auth', methods=['POST'])
def handle_auth():
    
    body = request.get_json()
    
    if body is None:
        return jsonify({'msg': 'Error'}), 400
    if "username" not in body: 
        return jsonify({'msg': 'Error'}), 400
    if "email" not in body: 
        return jsonify({'msg': 'Error'}), 400
    if "password" not in body: 
        return jsonify({'msg': 'Error'}), 400
    

    user = User.query.filter_by( 
         email = body["email"], 
         password = body["password"]).first()
    

    if user is None: 
        return jsonify({'msg': 'user not found'}), 401
    

    token = create_access_token(identity= user.email)
    
    
    return jsonify({'token': token}), 200


@api.route('/login', methods=['POST'])
def login_user():

    body = request.get_json()

    if not body or "email" not in body or "password" not in body:
        return jsonify({'msg': 'Faltan credenciales'}), 400

    email = body["email"]
    password = body["password"]


    user = User.query.filter_by(email=email, password=password).first()
    token = create_access_token(identity=str(user.email))
    user_data = {
        "id": user.id,
        "email": user.email,
        "username": user.username,
    }


    return jsonify({
        "msg": "Inicio de sesión exitoso",
        "token": token,
        "user": user_data,
    }), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user_info():

    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()  

    if not user:
        return jsonify({"msg": "User not found"}), 

    user_data = {
        "id": user.id,
        "email": user.email,
        "username": user.username,
    }

    return jsonify(user_data), 200


@api.route('/dashboard', methods=['GET'])
@jwt_required()
def handle_dashboard():
    
    current_user_email = get_jwt_identity() 
    
    user = User.query.filter_by(email=current_user_email).first()
    if user is None:
        return jsonify({'msg': 'user not exist'}), 404 

    response_body = {
        "message": f"This is the dashboard for user: {current_user_email}"
    }

    return jsonify(response_body), 200

