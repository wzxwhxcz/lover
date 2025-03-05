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
        
        /* 确保按钮在移动设备上有明显的过渡效果 */
        #no, #yes {
            transition: all 0.3s ease !important;
            -webkit-transition: all 0.3s ease !important;
        }
        
        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
        }
        
        @-webkit-keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(mobileStyles);
}

// 修改handleNoButtonClick函数以更好地支持移动设备
function handleNoButtonClick() {
    clickCount++;

    // 让 Yes 变大，每次放大 1.2 倍
    let yesSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;
    // 添加脉动动画
    yesButton.style.animation = "pulse 1s infinite";

    // 挤压 No 按钮，每次右移 50px并应用变换
    noOffset = clickCount * 50;
    
    // 在移动设备上，确保变换效果更明显
    if (isMobile) {
        // 随机决定是放大还是缩小，但要确保视觉效果明显
        const scaleEffect = (Math.random() > 0.5) ? 0.7 : 1.3;
        noButton.style.transform = `translateX(${noOffset}px) scale(${scaleEffect})`;
        // 确保动画平滑过渡
        noButton.style.transition = "all 0.3s ease";
    } else {
        noButton.style.transform = `translateX(${noOffset}px)`;
    }

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
    
    // 对移动设备特别处理透明度
    if (clickCount > 3) {
        const randomOpacity = Math.random() * 0.7 + 0.3; // 最小透明度为0.3，确保可见
        if (Math.random() > 0.5 || isMobile) {
            noButton.style.opacity = randomOpacity;
        } else {
            noButton.style.opacity = 1;
        }
    }
    
    // 为移动设备添加额外视觉反馈
    if (isMobile && clickCount >= 2) {
        // 添加闪烁效果
        noButton.style.animation = "blink 0.5s 3";
    }
    
    // 多次点击后添加疯狂模式
    if (clickCount >= 7) {
        noButton.classList.add("crazyMode");
        
        // 添加CSS样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes crazyShake {
                0% { transform: translate(${noOffset}px, 0) rotate(0deg) scale(1.2); }
                25% { transform: translate(${noOffset + 20}px, -30px) rotate(10deg) scale(0.8); }
                50% { transform: translate(${noOffset - 20}px, 30px) rotate(-10deg) scale(1.2); }
                75% { transform: translate(${noOffset + 40}px, -15px) rotate(5deg) scale(0.9); }
                100% { transform: translate(${noOffset}px, 0) rotate(0deg) scale(1.2); }
            }
            
            @-webkit-keyframes crazyShake {
                0% { -webkit-transform: translate(${noOffset}px, 0) rotate(0deg) scale(1.2); }
                25% { -webkit-transform: translate(${noOffset + 20}px, -30px) rotate(10deg) scale(0.8); }
                50% { -webkit-transform: translate(${noOffset - 20}px, 30px) rotate(-10deg) scale(1.2); }
                75% { -webkit-transform: translate(${noOffset + 40}px, -15px) rotate(5deg) scale(0.9); }
                100% { -webkit-transform: translate(${noOffset}px, 0) rotate(0deg) scale(1.2); }
            }
            
            .crazyMode {
                animation: crazyShake 0.5s infinite !important;
                -webkit-animation: crazyShake 0.5s infinite !important;
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
    if (isMobile) {
        const scaleEffect = (Math.random() > 0.5) ? 0.7 : 1.3;
        noButton.style.transform = `translateX(${noOffset}px) scale(${scaleEffect})`;
    } else {
        noButton.style.transform = `translateX(${noOffset}px)`;
    }
});

// 修改触摸事件支持移动设备
noButton.addEventListener("touchstart", function(event) {
    // 阻止默认触摸行为
    event.preventDefault();
    
    // 增加触发点击事件的几率，从33%改为50%
    if (Math.random() > 0.5) {
        // 直接调用点击处理函数
        handleNoButtonClick();
    } else {
        // 立即快速移动到新位置，但保留大小变化
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        
        // 如果已经有放大效果，保留放大效果
        let scaleChange = "";
        if (clickCount >= 2) {
            const randomScale = Math.random() > 0.4 ? 
                            0.5 + Math.random() * 0.4 : // 变小
                            1.1 + Math.random() * 0.4;  // 变大
            scaleChange = `scale(${randomScale})`;
        }
        
        noButton.style.transition = "transform 0.05s ease";
        noButton.style.transform = `translate(${noOffset + randomX}px, ${randomY}px) ${scaleChange}`;
    }
    
    // 在触摸事件1秒后，强制应用一次handleNoButtonClick，确保视觉效果生效
    setTimeout(function() {
        if (Math.random() > 0.7) { // 30%的几率额外增加一次点击效果
            handleNoButtonClick();
        }
    }, 1000);
    
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
    // 彻底清理现有页面
    document.documentElement.innerHTML = '';
    
    // 创建新的页面结构
    const newHead = document.createElement('head');
    const newBody = document.createElement('body');
    
    document.documentElement.appendChild(newHead);
    document.documentElement.appendChild(newBody);
    
    // 添加必要的元标签
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    newHead.appendChild(meta);
    
    // 添加页面标题
    const title = document.createElement('title');
    title.textContent = '表白成功';
    newHead.appendChild(title);
    
    // 创建五彩纸屑效果的函数
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        
        // 减少移动端的粒子数量
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const particleCount = isMobile ? 30 : 100;
        
        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // 确保在视口范围内随机分布
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * 20 - 20 + 'vh'; // 从视口顶部上方开始
            
            // 随机动画时间，确保连续效果
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
    
    // 创建漂浮爱心的函数
    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'hearts-container';
        
        // 减少移动端的爱心数量
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const heartCount = isMobile ? 15 : 30;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            
            // 确保在视口范围内随机分布
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = Math.random() * 20 - 20 + 'vh'; // 从视口底部下方开始
            
            // 随机动画时间，确保连续效果
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.animationDelay = Math.random() + 's';
            
            // 移动端适当调整大小
            heart.style.fontSize = (Math.random() * (isMobile ? 16 : 20) + (isMobile ? 8 : 10)) + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            
            heartsContainer.appendChild(heart);
        }
        
        return heartsContainer;
    }

    // 添加五彩纸屑和漂浮爱心
    newBody.appendChild(createConfetti());
    newBody.appendChild(createFloatingHearts());
    
    // 添加主要内容
    const yesScreen = document.createElement('div');
    yesScreen.className = 'yes-screen';
    yesScreen.innerHTML = `
        <h1 class="yes-text animated">!!!喜欢你!! ( >᎑<)♡︎ᐝ</h1>
        <img src="./images/hug.png" alt="拥抱" class="yes-image animated">
        <p class="love-message">从今天开始，我们的故事正式开始啦！</p>
        <p class="love-date">纪念日：${new Date().toLocaleDateString()}</p>
    `;
    
    newBody.appendChild(yesScreen);
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
        }
        
        body {
            background-color: #ffecf1;
            font-family: 'Arial', sans-serif;
            display: flex;
            flex-direction: column;
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
            padding: 20px;
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
            position: absolute;
            width: 10px;
            height: 20px;
            animation: confetti-fall linear infinite;
            -webkit-animation: confetti-fall linear infinite;
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
            position: absolute;
            animation: float-up linear infinite;
            -webkit-animation: float-up linear infinite;
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
        
        @keyframes confetti-fall {
            0% { transform: translateY(-20vh) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(720deg); }
        }
        
        @-webkit-keyframes confetti-fall {
            0% { -webkit-transform: translateY(-20vh) rotate(0deg); }
            100% { -webkit-transform: translateY(100vh) rotate(720deg); }
        }
        
        @keyframes float-up {
            0% { transform: translateY(100vh); }
            100% { transform: translateY(-20vh); }
        }
        
        @-webkit-keyframes float-up {
            0% { -webkit-transform: translateY(100vh); }
            100% { -webkit-transform: translateY(-20vh); }
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
            
            .confetti {
                width: 5px;
                height: 10px;
            }
        }
    `;
    
    newHead.appendChild(style);
    
    // 添加一些额外的动画元素，确保效果丰富
    setTimeout(function() {
        newBody.appendChild(createConfetti());
        newBody.appendChild(createFloatingHearts());
    }, 1000);
    
    // 增加额外的动画添加
    setInterval(function() {
        // 每3秒添加新的动画元素，确保持续效果
        newBody.appendChild(createConfetti());
        newBody.appendChild(createFloatingHearts());
        
        // 为避免过多DOM元素，移除较旧的动画容器
        const containers = newBody.querySelectorAll('.confetti-container, .hearts-container');
        if (containers.length > 6) {
            // 保留最新的元素，移除较旧的
            for (let i = 0; i < containers.length - 6; i++) {
                newBody.removeChild(containers[i]);
            }
        }
    }, 3000);
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