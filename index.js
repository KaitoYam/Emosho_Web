window.addEventListener('DOMContentLoaded', init);
document.addEventListener('keypress', press_button)
filter = document.getElementById('filter')
filter_num = 0
var filter_imgs = [
  '',
  './img/フィルター01.png',
  './img/フィルター02.jpg', 
  './img/フィルター03.png', 
  './img/フィルター04.jpg',
  './img/フィルター05.jpg',
  './img/フィルター07.jpg'
]

//フィルターのopacity変更
var filter_opacity = document.getElementsByClassName("range_opacity_filter")[0] 
filter_opacity.addEventListener('change', function(){
  document.getElementsByClassName("filter")[0].style.opacity = filter_opacity.value;
  console.log(filter_opacity.value)
})


function press_button(key){
  if(key.code == 'Enter'){
    console.log("press: "+ key.code);
    var canvas = document.getElementById('myCanvas');
    let downloadEle = document.createElement("a");
    downloadEle.href = canvas.toDataURL('image/png', 1.0);
    console.log(canvas.toDataURL('image/png', 1.0));
    downloadEle.download = "canvas.png";
    downloadEle.click();
  }else if(key.code == "KeyF"){
    filter_num ++;
    if(filter_num >= filter_imgs.length){
      filter_num = 0;
    }
    filter.src = filter_imgs[filter_num]
  }
}


function init() {
  const width = document.body.clientWidth;
  const height = window.innerHeight;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    preserveDrawingBuffer: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, 1000);

  //コントローラーを作成
  const controls = new THREE.OrbitControls(camera, document.body);

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  // 動画テクスチャのマテリアル作成
  const video = document.getElementById('video')
  // video.srcObject = stream
  // video.autoplay = true
  const videoTexture = new THREE.VideoTexture(video)
  videoTexture.minFilter = THREE.LinearFilter 
  // const material = new THREE.MeshPhongMaterial({map: videoTexture}) // 動画テクスチャのマテリアルの作成


  // 箱を作成
  const geometry = new THREE.PlaneGeometry(width, width*10/16);
  const material = new THREE.MeshStandardMaterial({map: videoTexture, roughness:0});
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);
  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);
    // camera.position.y += 1;

    // 箱を回転させる
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;
    // カメラコントローラーを更新
    controls.update();
    // レンダリング
    renderer.render(scene, camera);
  }
}
