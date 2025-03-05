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

// 检测是否为移动设备
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 把No按钮点击的相关代码封装成函数，便于复用
function handleNoButtonClick() {
    clickCount++;

    // 让 Yes 变大，每次放大 1.2 倍
    let yesSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;
    // 添加脉动动画
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
        noButton.classList.add("crazyMode");
        
        // 添加CSS样式
        const style = document.createElement('style');
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
}

// 增强No按钮的闪避行为
noButton.addEventListener("mouseover", function() {
    // 调整移动端和桌面端的闪避距离
    const moveRange = isMobile ? 150 : 400;
    const randomX = Math.random() * moveRange - (moveRange/2); 
    const randomY = Math.random() * moveRange - (moveRange/2); 
    
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

// 添加触摸事件支持移动设备
noButton.addEventListener("touchstart", function(event) {
    // 阻止默认触摸行为
    event.preventDefault();
    
    // 只有1/3的几率才真正触发点击事件
    if (Math.random() > 0.66) {
        handleNoButtonClick();
    } else {
        // 立即快速移动到新位置
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        noButton.style.transition = "transform 0.05s ease";
        noButton.style.transform = `translate(${noOffset + randomX}px, ${randomY}px)`;
    }
    
    return false;
});

// 添加鼠标移动监听，当鼠标接近时主动逃离（仅桌面端）
if (!isMobile) {
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
}

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
    // 创建五彩纸屑效果的函数 - 修复版本
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        
        // 减少移动端的粒子数量
        const particleCount = isMobile ? 30 : 100;
        
        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // 调整起始位置，确保从视口顶部开始
            confetti.style.position = 'fixed';
            confetti.style.top = "-10px";
            confetti.style.left = Math.random() * 100 + 'vw';
            
            // 调整大小以适应移动屏幕
            confetti.style.width = (isMobile ? 5 : 10) + 'px';
            confetti.style.height = (isMobile ? 10 : 20) + 'px';
            
            // 动画时间和延迟
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() + 's';
            
            // 随机颜色
            const colors = ['#ff718d', '#fdff8f', '#9cff9c', '#a0c4ff', '#ffc6ff'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机形状
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            confettiContainer.appendChild(confetti);
        }
        
        return confettiContainer;
    }
    
    // 创建漂浮爱心的函数 - 修复版本
    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'hearts-container';
        
        // 减少移动端的爱心数量
        const heartCount = isMobile ? 15 : 30;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            
            // 使用fixed定位，确保在视口内
            heart.style.position = 'fixed';
            // 爱心从底部出现
            heart.style.bottom = "-50px";
            heart.style.left = Math.random() * 100 + 'vw';
            
            // 动画时间和延迟
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.animationDelay = Math.random() + 's';
            
            // 移动端适当调整大小
            heart.style.fontSize = (Math.random() * (isMobile ? 16 : 20) + (isMobile ? 8 : 10)) + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            
            heartsContainer.appendChild(heart);
        }
        
        return heartsContainer;
    }

    // 更新页面内容为表白成功页面
    document.body.innerHTML = '';
    
    // 设置页面基本样式
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden'; // 防止滚动
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.body.style.backgroundColor = '#ffecf1';
    document.body.style.position = 'relative';
    
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
    
    // 添加CSS样式 - 修复版
    const style = document.createElement('style');
    style.textContent = `
        html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
        }
        
        body {
            background-color: #ffecf1;
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .yes-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            text-align: center;
            z-index: 10;
            position: relative;
            padding: 0 20px;
            box-sizing: border-box;
        }
        
        .yes-text {
            color: #ff4d6d;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            animation: bounce 1s infinite alternate;
            -webkit-animation: bounce 1s infinite alternate;
        }
        
        .yes-image {
            max-width: 80%;
            width: 300px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            animation: pulse 2s infinite;
            -webkit-animation: pulse 2s infinite;
        }
        
        .love-message {
            font-size: 1.5rem;
            color: #ff758f;
            margin-top: 2rem;
            animation: fadeIn 2s;
            -webkit-animation: fadeIn 2s;
        }
        
        .love-date {
            font-size: 1.2rem;
            color: #ff8fa3;
            margin-top: 1rem;
            border: 2px dashed #ffb3c1;
            padding: 10px 20px;
            border-radius: 50px;
            animation: fadeIn 3s;
            -webkit-animation: fadeIn 3s;
        }
        
        @keyframes bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-20px); }
        }
        
        @-webkit-keyframes bounce {
            from { -webkit-transform: translateY(0); }
            to { -webkit-transform: translateY(-20px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @-webkit-keyframes pulse {
            0% { -webkit-transform: scale(1); }
            50% { -webkit-transform: scale(1.05); }
            100% { -webkit-transform: scale(1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @-webkit-keyframes fadeIn {
            from { opacity: 0; -webkit-transform: translateY(20px); }
            to { opacity: 1; -webkit-transform: translateY(0); }
        }
        
        .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        }
        
        .confetti {
            position: fixed;
            width: 10px;
            height: 20px;
            animation: confetti-fall linear forwards;
            -webkit-animation: confetti-fall linear forwards;
            animation-iteration-count: infinite;
            -webkit-animation-iteration-count: infinite;
        }
        
        @keyframes confetti-fall {
            0% { transform: translateY(-10px) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(720deg); }
        }
        
        @-webkit-keyframes confetti-fall {
            0% { -webkit-transform: translateY(-10px) rotate(0deg); }
            100% { -webkit-transform: translateY(100vh) rotate(720deg); }
        }
        
        .hearts-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 6;
        }
        
        .floating-heart {
            position: fixed;
            animation: float-up linear forwards;
            -webkit-animation: float-up linear forwards;
            animation-iteration-count: infinite;
            -webkit-animation-iteration-count: infinite;
        }
        
        @keyframes float-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100vh); }
        }
        
        @-webkit-keyframes float-up {
            0% { -webkit-transform: translateY(0); }
            100% { -webkit-transform: translateY(-100vh); }
        }
        
        /* 移动端特定样式 */
        @media (max-width: 768px) {
            .yes-text {
                font-size: 1.8rem;
            }
            
            .love-message {
                font-size: 1.2rem;
            }
            
            .love-date {
                font-size: 1rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // 确保动画立即开始并持续
    setTimeout(function() {
        // 在页面加载后重新创建一些动画元素，确保它们显示
        const newConfetti = createConfetti();
        const newHearts = createFloatingHearts();
        document.body.appendChild(newConfetti);
        document.body.appendChild(newHearts);
    }, 1000);
});

// 给"可以"按钮添加悬停效果
yesButton.addEventListener("mouseover", function() {
    yesButton.style.transform = "scale(1.1)";
    yesButton.style.transition = "transform 0.3s ease";
    yesButton.style.boxShadow = "0 5px 15px rgba(255, 105, 180, 0.4)";
});

yesButton.addEventListener("mouseout", function() {
    const currentSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${currentSize})`;
    yesButton.style.boxShadow = "none";
});

// 为移动设备添加额外CSS初始化
if (isMobile) {
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @-webkit-keyframes pulse {
            0% { -webkit-transform: scale(1); }
            50% { -webkit-transform: scale(1.05); }
            100% { -webkit-transform: scale(1); }
        }
    `;
    document.head.appendChild(mobileStyles);
}