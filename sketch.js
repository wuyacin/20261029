// 定義全域變數
let jumpSpriteSheet; // 儲存跳躍精靈圖
let walkSpriteSheet; // 儲存走路精靈圖

let jumpFrames = []; // 儲存解構後的跳躍每一格畫面
let walkFrames = []; // 儲存解構後的走路每一格畫面

let currentFrames = []; // 當前正在播放的動畫畫面陣列
let frameIndex = 0; // 當前播放的動畫格數索引值

let x, y; // 角色的 X 和 Y 座標位置
let speed = 4; // 角色移動的速度
let direction = 1; // 角色朝向：1 表示右邊，-1 表示左邊

// 預先載入圖片資源
function preload() {
  // 載入跳躍精靈圖（寬1091，高188，共7張圖）
  jumpSpriteSheet = loadImage('1/jump/jump.png');
  // 載入走路精靈圖（寬1246，高198，共8張圖）
  walkSpriteSheet = loadImage('1/走/走.png');
}

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定動畫播放的幀率（每秒幾格畫面），讓動畫看起來流暢
  frameRate(12);

  // 初始化角色位置在畫面正中央
  x = width / 2;
  y = height / 2;

  // 計算並切切割跳躍精靈圖（7張圖橫向排列）
  let jumpFrameWidth = 1091 / 7; // 計算單張跳躍圖的寬度
  let jumpFrameHeight = 188;     // 跳躍圖的高度
  for (let i = 0; i < 7; i++) {
    // 依序剪裁出每一格畫面並存入陣列
    jumpFrames.push(jumpSpriteSheet.get(i * jumpFrameWidth, 0, jumpFrameWidth, jumpFrameHeight));
  }

  // 計算並切切割走路精靈圖（8張圖橫向排列）
  let walkFrameWidth = 1246 / 8; // 計算單張走路圖的寬度
  let walkFrameHeight = 198;     // 走路圖的高度
  for (let i = 0; i < 8; i++) {
    // 依序剪裁出每一格畫面並存入陣列
    walkFrames.push(walkSpriteSheet.get(i * walkFrameWidth, 0, walkFrameWidth, walkFrameHeight));
  }

  // 預設初始動畫為跳躍動畫
  currentFrames = jumpFrames;
}

function draw() {
  // 設定背景顏色為十六進位碼 e4c1f9
  background('#e4c1f9');

  // 預設狀態：如果沒有按鍵，就播放跳躍動畫
  let isMoving = false;

  // 偵測鍵盤按鍵並處理移動與動畫切換
  if (keyIsDown(RIGHT_ARROW)) {
    x += speed; // 座標往右增加
    direction = 1; // 設定朝向為右邊
    currentFrames = walkFrames; // 切換為走路動畫
    isMoving = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    x -= speed; // 座標往左減少
    direction = -1; // 設定朝向為左邊（需要翻轉）
    currentFrames = walkFrames; // 切換為走路動畫
    isMoving = true;
  }

  // 如果使用者放開左右鍵，自動切換回跳躍動畫
  if (!isMoving) {
    // 如果當前不是跳躍動畫，則切換回去並重設索引值
    if (currentFrames !== jumpFrames) {
      currentFrames = jumpFrames;
      frameIndex = 0;
    }
  }

  // 進入畫布矩陣轉換狀態，方便做角色的翻轉與定位
  push();
  
  // 將畫布原點移動到角色的 X, Y 位置（以角色中心或基準點繪製）
  translate(x, y);
  
  // 利用 scale(direction, 1) 來做水平翻轉。當 direction 為 -1 時就會往左轉
  scale(direction, 1);
  
  // 設定圖片繪製模式為中央對齊
  imageMode(CENTER);
  
  // 繪製當前動畫格的圖片在原點 (0,0)
  image(currentFrames[frameIndex], 0, 0);
  
  // 離開畫布矩陣轉換狀態，恢復原本畫布設定
  pop();

  // 更新動畫格索引，使其循環播放
  frameIndex = (frameIndex + 1) % currentFrames.length;
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

