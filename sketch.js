var colors = "ffc09f-ffee93-fcf5c7-a0ced9-adf7b6".split("-").map(a=>"#"+a)
var colors_r = "ff6d00-ff7900-ff8500-ff9100-ff9e00-240046-3c096c-5a189a-7b2cbf-9d4edd".split("-").map(a=>"#"+a)
var clr,clr_r
//宣告陣列資料，記錄每一朵花的基本資料
var positionListX =[]  //花的X軸位置
var positionListY =[]  //花的Y軸位置
var clrList=[]      //花瓣顏色
var clr_r_List = []  //花圓心顏色
var sizeList =[]  //花的大小

var face_x = [] //臉x軸的變數
var face_y = [] //臉y軸的變數
var face_size = [] //臉大小的變數
var face_num = 1 //臉數量

//++++++++++手勢辨識_變數宣告區++++++++++++++++++++++++
let handpose;
let video;  //攝影機取影像，放影像資料
let predictions = [];  //紀錄所有手勢21點所有資料
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d //後面變數名稱有8代表食指最上端，4代表大拇指的最上端。大寫的X、Y、Z手指所在的座標，d代表為4與8點的距離(只有取xy軸)
let pointerX14,pointerY14,pointerX16,pointerY16  //用四個變數紀錄第14點(pointerX14,pointerY14)，16點的X，Y(pointerX16,pointerY16)
//++++++++++++++++++++++++++++++++++++++++++++++++++++


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var j=0;j<1;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)
    //紀錄資料
    positionListX.push(random(width)) //把花X位置存入到positionListX list資料內
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionListX[j],positionListY[j]) //花的座標，原點移到中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
		
		  for(var i=0;i<face_num;i++){ //設定迴圈
        face_size[i] = 100  //臉的大小100~400
        face_x[i] = positionListX[j] //臉的x軸在視窗寬除以2
        face_y[i] = positionListY[j] //臉的x軸在視窗寬除以2
        
      }
		
    pop()
    }
	//+++++++++++++取得攝影機影像並連線手勢辨識+++++++++++++++++++++
	
		video = createCapture(VIDEO);  //取得攝影機的影像，影像的畫面存到video
		video.size(width, height);  //影像的大小為整個視窗大小

		handpose = ml5.handpose(video, modelReady);  //把video影像執行手辨識，辨識完畢會去執行modelReady function

  	// This sets up an event that fills the global variable "predictions"
  	// with an array every time new hand poses are detected
		handpose.on("predict", (results) => {  
    		predictions = results;   //手勢辨識後的結果放到predictions變數內
		}); 

  	// Hide the video element, and just show the canvas
		video.hide();  //隱藏video
		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++	
}


function modelReady() {
  console.log("Model ready!");
}




function draw() {  //一秒進到function執行60次
  //攝影機反向
  translate(width, 0);
  scale(-1, 1);
  //+++++++++
	background(255); 
	
	image(video,0,0,width, height)
	
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指上端的距離
	
  for(var j=0;j<positionListY.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionListY[j],positionListX[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
		// rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
		r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j]) 
    }
  drawKeypoints();
}

function drawFlower(clr,clr_r,size=1){  //clr:花瓣顏色，clr_r:花圓心顏色，size:花大小
  
  for(var j=0;j<face_num;j++){
    push()
      var f_s = face_size[j]
        // translate(face_x[j],face_y[j])//將圓心(0,0)移動到畫布正中心
        fill("#FAC462") //膚色
      strokeWeight(5) //邊框粗細
      stroke(100)
      ellipse(f_s/7.5,f_s/2,f_s/7.5,f_s/15) //右腳
      ellipse(-f_s/7.5,f_s/2,f_s/7.5,f_s/15) //左腳

      ellipse(f_s/2,f_s/7.5,f_s/10,f_s/5) //右手
      ellipse(-f_s/2,f_s/7.5,f_s/10,f_s/5) //左手
      
      //頭毛
      fill("#e5383b")
      ellipse(0,-f_s/2,f_s/16,f_s/8) 
      ellipse(-f_s/20,-f_s/2.05,f_s/18,f_s/9)
      ellipse(f_s/20,-f_s/2.05,f_s/18,f_s/9)

      fill("#FAC462")
      stroke(100)
      ellipse(0,0,f_s)  //臉



      fill("#FDAFAF")
      noStroke()
      ellipse(f_s/3,f_s/30,f_s/10,f_s/20) //右腮紅橢圓
      ellipse(-f_s/3,f_s/30,f_s/10,f_s/20) //左腮紅橢圓

      //左眼
      fill(0)
      ellipse(-f_s/5.2+map(mouseX/3,0,width,-f_s/40,f_s/12),-f_s/5.2+map(mouseY/3,0,height,-f_s/40,f_s/12),f_s/10)
      fill(255)
      ellipse(-f_s/5.7+map(mouseX/3,0,width,-f_s/40,f_s/12),-f_s/5.8+map(mouseY/3,0,height,-f_s/40,f_s/12),f_s/40)
      ellipse(-f_s/5.4+map(mouseX/3,0,width,-f_s/40,f_s/12),-f_s/5.4+map(mouseY/3,0,height,-f_s/40,f_s/12),f_s/40)

      //右眼
      fill(0)
      ellipse(f_s/5.8+map(mouseX/3,0,width,-f_s/40,f_s/12),-f_s/4.8+map(mouseY/3,0,height,-f_s/40,f_s/12),f_s/10)
      fill(255)
      ellipse(f_s/5.7+map(mouseX/3,0,width,-f_s/40,f_s/12),-f_s/5+map(mouseY/3,0,height,-f_s/40,f_s/12),f_s/40)
      ellipse(f_s/5.4+map(mouseX/3,0,width,-f_s/40,f_s/12),-f_s/5.4+map(mouseY/3,0,height,-f_s/40,f_s/12),f_s/40)

      //嘴
      stroke(0)
      strokeWeight(3)
      fill("#e27396")

      beginShape()
      vertex(0,0)
      vertex(-f_s/15,f_s/25)
      vertex(0,f_s/10)
      vertex(f_s/15,f_s/25)
      vertex(0,0)
      endShape()

     
      
      noFill()

      pop()   
}
}

function mousePressed(){
//紀錄資料
positionListX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
positionListY.push(mouseY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
//畫圖
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到中心點
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
  drawFlower(clr,clr_r,sizeList[data_length-1]) 
pop()
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      
      // noStroke();
      if (j == 8) {			 //食指的上端	
				pointerX8 = map(keypoint[0],0,640,0,width)  //j=8所以取得第8點的資訊，keypoint[0]代表x(食指座標)
				pointerY8 = map(keypoint[1],0,480,0,height)  //keypoint[1]代表y(食指座標)
        pointerZ8 = keypoint[2] //keypoint[2]代表z(食指座標)
       	console.log(pointerZ8)
        if(pointerZ8<-40)
        {
          R_draw(pointerX8,pointerY8)
        }
				
				fill(0, 255, 0);
				ellipse(pointerX8, pointerY8, 30, 30);//食指圓圈
				
      } else
      if (j == 4) {  //  大拇指
				
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
				fill(255,0,0)
        ellipse(pointerX4, pointerY4, 30, 30);  //大拇指圓圈
		
      } else
      if (j == 14) { //無名指
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) { //無名指
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}

function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
	push()
		translate(F_x,F_y);
		if(pointerY14<pointerY16){   //
			drawFlower(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+0.6)) //花放大縮小，無名指彎曲
		}else
		{
			//無名指沒彎曲，張開無名指，花旋轉
			rotate(frameCount/20)
			drawFlower(F_clr,F_clr_r,F_size)			
		}
	pop()
}

function R_draw(handX,handY)
{
	//紀錄資料
positionListX.push(handX) //滑鼠按下位置作花X位置，存入到positionListX list資料內
positionListY.push(handY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
//畫圖
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到中心點
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
  drawFlower(clr,clr_r,sizeList[data_length-1]) 
pop()
}
