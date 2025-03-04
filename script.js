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

// 让"不要"按钮在悬停时有闪避行为
noButton.addEventListener("mouseover", function() {
    // 随机移动按钮位置
    const randomX = Math.random() * 100 - 50; // -50到50之间的随机值
    const randomY = Math.random() * 100 - 50; // -50到50之间的随机值
    noButton.style.transform = `translate(${noOffset + randomX}px, ${randomY}px)`;
    // 添加抖动效果
    noButton.style.transition = "transform 0.2s ease";
});

noButton.addEventListener("mouseout", function() {
    // 恢复原来的位置
    noButton.style.transform = `translateX(${noOffset}px)`;
});

// No 按钮点击事件
noButton.addEventListener("click", function () {
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
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        body {
            background-color: #ffecf1;
            overflow: hidden;
            transition: background-color 1s ease;
            font-family: 'Arial', sans-serif;
        }
        
        .yes-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            z-index: 10;
            position: relative;
        }
        
        .yes-text {
            color: #ff4d6d;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            animation: bounce 1s infinite alternate;
        }
        
        .yes-image {
            max-width: 300px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            animation: pulse 2s infinite;
        }
        
        .love-message {
            font-size: 1.5rem;
            color: #ff758f;
            margin-top: 2rem;
            animation: fadeIn 2s;
        }
        
        .love-date {
            font-size: 1.2rem;
            color: #ff8fa3;
            margin-top: 1rem;
            border: 2px dashed #ffb3c1;
            padding: 10px 20px;
            border-radius: 50px;
            animation: fadeIn 3s;
        }
        
        @keyframes bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
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
        
        @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(720deg); }
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
        
        @keyframes float-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100vh); }
        }
    `;
    
    document.head.appendChild(style);
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