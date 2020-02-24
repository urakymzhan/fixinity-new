from flask import Flask, jsonify, request

app = Flask(__name__)

# customersData = [
#                 { 'Name': 'Wasif', 'Phone': "111-111-1111", 'Zip': 94321, 'VIN': "VIN2398", 'Status': "Active", 'Action': "NUL" },
#                 { 'Name': 'Ali', 'Phone': "111-111-1111", 'Zip': 94321, 'VIN': "VIN2398", 'Status': "Active", 'Action': "NUL" },
#                 { 'Name': 'Saad', 'Phone': "111-111-1111", 'Zip': 94321, 'VIN': "VIN2398", 'Status': "Active", 'Action': "NUL" },
#                 { 'Name': 'Asad', 'Phone': "111-111-1111", 'Zip': 94321, 'VIN': "VIN2398", 'Status': "Active", 'Action': "NUL"},
#                 { 'Name': 'Wasif', 'Phone': "111-111-1111", 'Zip': 94321, 'VIN': "VIN2398", 'Status': "Active", 'Action': "NUL" }
#              ]

customersData = [
      {"id": 1, "name": 'Azamat', "phone": '5718894220', "zip": '94330', "vin": '5346543654641', "status":'Active', "action": ''},
      {"id": 2, "name": 'Kuttubek', "phone": '5718894220', "zip": '94330', "vin": '5346543654641', "status": 'Inactive', "action": ''},
      {"id": 3, "name": 'Aibek', "phone": '5718894220', "zip": '94330', "vin": '5346543654641', "status": 'Progress', "action": ''},
      {"id": 4, "name": 'Tolon', "phone": '5718894220', "zip": '94330', "vin": '5346543654641', "status": 'Active', "action": ''},
      {"id": 5, "name": 'Kanat', "phone": '5718894220', "zip": '94330', "vin": '5346543654641', "status": 'Inactive', "action": ''},
      {"id": 6, "name": 'Zamir', "phone": '5718894220', "zip": '94330', "vin": '5346543654641', "status": 'Active', "action": ''},   
      {"id": 7, "name": 'David', "phone": '5718894220', "zip": '94330', "vin": '5346543654641', "status": 'Inactive', "action": ''}
]

@app.route('/customers', methods=["GET"])
def get_incomes():
  return jsonify(customersData), 200