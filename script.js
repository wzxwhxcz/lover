let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;  // 记录点击 No 的次数
let noOffset = 0;    // 记录No按钮的当前位移

// No 按钮的文字变化 - 增加更多选项
const noTexts = [
    "？你认真的吗…",
    "要不再想想？",
    "不许选这个！ ",
    "我会很伤心…",
    "不行:(",
    "再给我一次机会吧！",
    "你确定要拒绝我吗？",
    "真的要这样吗...",
    "我的心都碎了💔",
    "求你了...",
    "我会哭的，真的",
    "别这样嘛~",
    "再考虑一下呗？",
    "你忍心看我难过吗？",
    "最后一次机会！"
];

// 把No按钮点击的相关代码封装成函数，便于复用
function handleNoButtonClick() {
    clickCount++;

    // 让 Yes 变大，每次放大 1.2 倍
    let yesSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;
    // 添加脉动动画
    if (!document.querySelector("style#pulseAnimation")) {
        const style = document.createElement('style');
        style.id = "pulseAnimation";
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(${yesSize}); }
                50% { transform: scale(${yesSize * 1.05}); }
                100% { transform: scale(${yesSize}); }
            }
        `;
        document.head.appendChild(style);
    }
    yesButton.style.animation = "pulse 1s infinite";

    // 挤压 No 按钮，每次右移 50px
    noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;

    // 让图片和文字往上移动
    let moveUp = clickCount * 25;
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    // No 文案变化（循环使用文字数组）
    const textIndex = (clickCount - 1) % noTexts.length;
    noButton.innerText = noTexts[textIndex];

    // 背景颜色随点击次数变化（逐渐变粉红色表示心动）
    let pinkIntensity = Math.min(255, 200 + clickCount * 5);
    let otherColors = Math.max(200, 255 - clickCount * 5);
    document.body.style.backgroundColor = `rgb(${pinkIntensity}, ${otherColors}, ${otherColors})`;
    document.body.style.transition = "background-color 0.5s ease";

    // 图片变化
    if (clickCount === 1) mainImage.src = "./images/shocked.png";  
    if (clickCount === 2) mainImage.src = "./images/think.png";   
    if (clickCount === 3) mainImage.src = "./images/angry.png"; 
    if (clickCount === 4) mainImage.src = "./images/crying.png";   
    if (clickCount >= 5) mainImage.src = "./images/crying.png";
    
    // 新增：随机改变透明度，让按钮更难找到
    if (clickCount > 3) {
        const randomOpacity = Math.random() * 0.7;
        if (Math.random() > 0.5) {
            noButton.style.opacity = randomOpacity;
        } else {
            noButton.style.opacity = 1;
        }
    }
    
    // 多次点击后添加疯狂模式
    if (clickCount >= 7) {
        if (!document.querySelector("style#crazyMode")) {
            const style = document.createElement('style');
            style.id = "crazyMode";
            style.textContent = `
                @keyframes crazyShake {
                    0% { transform: translate(${noOffset}px, 0) rotate(0deg); }
                    25% { transform: translate(${noOffset + 20}px, -30px) rotate(10deg); }
                    50% { transform: translate(${noOffset - 20}px, 30px) rotate(-10deg); }
                    75% { transform: translate(${noOffset + 40}px, -15px) rotate(5deg); }
                    100% { transform: translate(${noOffset}px, 0) rotate(0deg); }
                }
                
                .crazyMode {
                    animation: crazyShake 0.5s infinite;
                }
            `;
            document.head.appendChild(style);
        }
        noButton.classList.add("crazyMode");
    }
}

// 增强No按钮的闪避行为
noButton.addEventListener("mouseover", function() {
    // 增加移动范围，从之前的-50到50变为-200到200
    const randomX = Math.random() * 400 - 200; 
    const randomY = Math.random() * 400 - 200; 
    
    // 按钮更快地移动
    noButton.style.transition = "all 0.1s ease";
    
    // 根据点击次数增加闪避能力
    const evasionMultiplier = 1 + (clickCount * 0.5);
    
    // 随机改变大小
    let scaleChange = "";
    if (clickCount >= 3) {
        const randomScale = Math.random() > 0.4 ? 
                          0.5 + Math.random() * 0.4 : // 变小
                          1.1 + Math.random() * 0.4;  // 变大
        scaleChange = `scale(${randomScale})`;
    }
    
    noButton.style.transform = `translate(${noOffset + randomX * evasionMultiplier}px, ${randomY * evasionMultiplier}px) ${scaleChange}`;
});

noButton.addEventListener("mouseout", function() {
    // 恢复原来的位置
    noButton.style.transform = `translateX(${noOffset}px)`;
});

// 添加鼠标移动监听，当鼠标接近时主动逃离
document.addEventListener("mousemove", function(event) {
    if (clickCount >= 2) {
        const buttonRect = noButton.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        
        // 计算鼠标与按钮的距离
        const distanceX = event.clientX - buttonCenterX;
        const distanceY = event.clientY - buttonCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // 当鼠标靠近时，按钮主动逃离
        const proximityThreshold = 150; // 感应距离
        if (distance < proximityThreshold) {
            // 计算逃离方向（与鼠标方向相反）
            const escapeX = -distanceX * 1.5;
            const escapeY = -distanceY * 1.5;
            
            noButton.style.transition = "transform 0.2s ease";
            noButton.style.transform = `translate(${noOffset + escapeX}px, ${escapeY}px)`;
        }
    }
});

// 添加点击闪避 - 当尝试点击按钮时立即闪避
noButton.addEventListener("mousedown", function(event) {
    // 阻止默认点击行为
    event.preventDefault();
    
    // 立即快速移动到新位置
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    noButton.style.transition = "transform 0.05s ease";
    noButton.style.transform = `translate(${noOffset + randomX}px, ${randomY}px)`;
    
    // 只有1/3的几率才真正触发点击事件
    if (Math.random() > 0.66) {
        handleNoButtonClick();
    }
    
    return false;
});

// No 按钮点击事件
noButton.addEventListener("click", function () {
    handleNoButtonClick();
});

// Yes 按钮点击后，进入表白成功页面
yesButton.addEventListener("click", function () {
    // 创建五彩纸屑效果的函数
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            // 随机颜色
            const colors = ['#ff718d', '#fdff8f', '#9cff9c', '#a0c4ff', '#ffc6ff'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机形状
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            confettiContainer.appendChild(confetti);
        }
        
        return confettiContainer;
    }
    
    // 创建漂浮爱心的函数
    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'hearts-container';
        
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 4 + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            
            heartsContainer.appendChild(heart);
        }
        
        return heartsContainer;
    }

    // 更新页面内容为表白成功页面
    document.body.innerHTML = '';
    
    // 添加必要的CSS动画
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(720deg); }
        }
        
        @keyframes float-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100vh); }
        }
        
        @keyframes bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .confetti {
            position: absolute;
            top: -10px;
            width: 10px;
            height: 20px;
            animation: confetti-fall linear forwards;
        }
        
        .hearts-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        }
        
        .floating-heart {
            position: absolute;
            bottom: -50px;
            animation: float-up linear forwards;
        }
        
        .animated {
            animation-duration: 1s;
            animation-fill-mode: both;
        }
        
        .yes-text {
            animation: bounce 1s infinite alternate;
            color: #ff4d6d;
        }
        
        .yes-image {
            animation: pulse 2s infinite;
        }
        
        .love-message {
            animation: fadeIn 2s;
            color: #ff758f;
            font-size: 1.5rem;
            margin-top: 2rem;
        }
        
        .love-date {
            animation: fadeIn 3s;
            color: #ff8fa3;
            font-size: 1.2rem;
            margin-top: 1rem;
            border: 2px dashed #ffb3c1;
            padding: 10px 20px;
            border-radius: 50px;
        }
    `;
    document.head.appendChild(animationStyle);
    
    // 添加五彩纸屑和漂浮爱心
    document.body.appendChild(createConfetti());
    document.body.appendChild(createFloatingHearts());
    
    // 添加主要内容
    const yesScreen = document.createElement('div');
    yesScreen.className = 'yes-screen';
    yesScreen.innerHTML = `
        <h1 class="yes-text animated">!!!喜欢你!! ( >᎑<)♡︎ᐝ</h1>
        <img src="./images/hug.png" alt="拥抱" class="yes-image animated">
        <p class="love-message">从今天开始，我们的故事正式开始啦！</p>
        <p class="love-date">纪念日：${new Date().toLocaleDateString()}</p>
    `;
    
    document.body.appendChild(yesScreen);
});

// 给"可以"按钮添加悬停效果
yesButton.addEventListener("mouseover", function() {
    const currentSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${currentSize * 1.1})`;
    yesButton.style.transition = "transform 0.3s ease";
    yesButton.style.boxShadow = "0 5px 15px rgba(255, 105, 180, 0.4)";
});

yesButton.addEventListener("mouseout", function() {
    const currentSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${currentSize})`;
    yesButton.style.boxShadow = "none";
});