import newrelic.agent
newrelic.agent.initialize('newrelic.ini')
from flask import Flask, render_template, request, flash, json
from forms import ContactForm
from flaskext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash


app = Flask(__name__)  
app.secret_key = 'hardtoguesskey' #use vault    



mysql = MySQL()
 
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '' #use vault
app.config['MYSQL_DATABASE_DB'] = 'SimpleApp'
app.config['MYSQL_DATABASE_HOST'] = 'localhost' #use consul
mysql.init_app(app)

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
  form = ContactForm()

  if request.method == 'POST':
    if form.validate() == False:
      flash('All fields are required.')
      return render_template('contact.html', form=form)
    else:
      return render_template('contact.html', success=True)

  elif request.method == 'GET':
    return render_template('contact.html', form=form)

@app.route('/showSignUp')
def showSignUp():
    return render_template('signup.html')
 
@app.route('/signUp',methods=['POST'])
def signUp():
 
    # read the posted values from the UI
    _name = request.form['inputName']
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']

    # validate the received values
    if _name and _email and _password:
      conn = mysql.connect()
      cursor = conn.cursor()
      _hashed_password = generate_password_hash(_password)
      cursor.callproc('sp_createUser',(_name,_email,_hashed_password))
      data = cursor.fetchall()
      if len(data) is 0:
        conn.commit()
        return json.dumps({'message':'User created successfully !'})
      else:
        return json.dumps({'error':str(data[0])})
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})
    
    conn = mysql.connect()
    cursor = conn.cursor()
    _hashed_password = generate_password_hash(_password)
    cursor.callproc('sp_createUser.sql',(_name,_email,_hashed_password))

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8880, debug=True)
