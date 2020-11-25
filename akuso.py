import newrelic.agent
newrelic.agent.initialize('newrelic.ini')

from flask import Flask, render_template, request, flash, json
from forms import ContactForm
#from flaskext.mysql import MySQL

app = Flask(__name__)      
app.config.from_pyfile('config.py')

# mysql = MySQL()
# mysql.init_app(app)

@app.route('/')
def home():
  newrelic.agent.set_transaction_name("Home")
  return render_template('home.html')

@app.route('/about')
def about():
  newrelic.agent.set_transaction_name("About")
  return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
  newrelic.agent.set_transaction_name("Contact")
  form = ContactForm()

  if request.method == 'POST':
    if form.validate() == False:
      flash('All fields are required.')
      return render_template('contact.html', form=form)
    else:
      return render_template('contact.html', success=True)

  elif request.method == 'GET':
    return render_template('contact.html', form=form)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8880)
