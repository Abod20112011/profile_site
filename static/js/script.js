// تبديل الوضع الليلي
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// عداد الإحصائيات المتحرك
const statValues = document.querySelectorAll('.stat-value');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
};

// تشغيل العدادات عند التمرير إلى القسم
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.classList.contains('animated')) {
                statValue.classList.add('animated');
                animateCounter(statValue);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

// زر المشاركة
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', async () => {
    const shareData = {
        title: 'الملف الشخصي',
        text: `تعرف على الملف الشخصي لـ ${document.querySelector('.profile-name').textContent}`,
        url: window.location.href,
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // نسخ الرابط إذا لم يكن Sharing API مدعومًا
            await navigator.clipboard.writeText(window.location.href);
            alert('تم نسخ الرابط إلى الحافظة!');
        }
    } catch (err) {
        console.error('خطأ في المشاركة:', err);
    }
});

// تأثير تكبير الصورة عند النقر
const profileImg = document.getElementById('profileImg');

profileImg.addEventListener('click', function() {
    this.classList.toggle('zoomed');
});

// إضافة تأثير التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// تحميل الصفحة
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
