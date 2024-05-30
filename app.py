from flask import Flask, render_template, url_for, request

app = Flask(__name__)

@app.route('/')
def index():
    use_custom_background = True
    return render_template('index.html',use_custom_background=use_custom_background)
@app.route('/articles')
def second():
    article = request.args.get('article')
    return render_template('articles.html', article=article)

if __name__ == "__main__":
    app.run(debug=True)
