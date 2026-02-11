from flask import Flask, render_template, request, redirect, url_for
import os

app = Flask(__name__)

# بيانات المستخدم
user_data = {
    "name": "كرار",
    "title": "𓏺 𝖺𝖱𝖱𝖺𝖲",
    "username": "@lx5x5",
    "profile_image": "https://files.catbox.moe/vffrzb.jpg",
    "channels": [
        {"name": "القناة الأولى", "url": "https://t.me/InaRaS5", "icon": "fab fa-telegram"},
        {"name": "القناة الثانية", "url": "https://t.me/InaRaS3", "icon": "fab fa-telegram"},
    ],
    "social_links": [
        {"name": "Telegram", "url": "https://t.me/", "icon": "fab fa-telegram", "color": "#0088cc"},
        {"name": "Twitter", "url": "https://twitter.com/", "icon": "fab fa-twitter", "color": "#1da1f2"},
        {"name": "GitHub", "url": "https://github.com/", "icon": "fab fa-github", "color": "#333"},
        {"name": "Instagram", "url": "https://instagram.com/", "icon": "fab fa-instagram", "color": "#e4405f"},
    ]
}

@app.route('/')
def home():
    return render_template('index.html', user=user_data)

@app.route('/update', methods=['GET', 'POST'])
def update_profile():
    if request.method == 'POST':
        # في تطبيق حقيقي، هنا يمكنك تحديث البيانات في قاعدة بيانات
        user_data['name'] = request.form.get('name', user_data['name'])
        user_data['title'] = request.form.get('title', user_data['title'])
        user_data['username'] = request.form.get('username', user_data['username'])
        return redirect(url_for('home'))
    
    return render_template('update.html', user=user_data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
