const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top'); //한번찾고 아래에서 두번 동작함(아이콘 이동, 스크롤 위로)

window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY);
  if (window.scrollY>500) {
    //배지숨기기
    //gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, .6, {
      opacity:0,
      display: 'none'
    });
    //버튼보이기
    gsap.to('#to-top', .2, {
      x: 0 //x축으로 이동(px)
    });
  }  else {
    //배지보이기
    gsap.to(badgeEl, .6, {
      opacity:1, //투명도
      display: 'block'
    });
    //버튼숨기기
    gsap.to('#to-top', .2, {
      x: 100 //x축으로 이동(px)
    });
    }
}, 300));
//_.throttled(함수, 시간[ms])


toTopEl.addEventListener('click', function() {
  gsap.to(window, .7,{
    scrollTo: 0 //지정한 시간동안 위쪽으로 옮겨줌
  });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function (fadeEl, index) {
     //gsap.to(요소, 지속시간, 옵션)
     gsap.to(fadeEl, 1, {
      delay: ( index+1 ) * .7, //0.7 , 1.4, 2.1, 2.8 초마다 넘어감
      opacity:1
     });
});



// new Swiper(선택자,옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', //수직 슬라이드
  autoplay: true, //자동재생여부
  loop: true //반복 재생여부
});

new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal' 기본옵션이라 따로 추가할 필요는 없음
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번슬라이드가 가운데보이기
  loop: true,//반복 재생여부
  autoplay: { //자동재생여부
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 할당
    clickable: true //사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev', //이전
    nextEl: '.promotion .swiper-next' //다음
  }
});
new Swiper('.awards .swiper-container', {
  // direction: 'horizontal' 기본옵션이라 따로 추가할 필요는 없음
  autoplay:true, //자동재생여부
  loop: true,//반복 재생여부
  spaceBetween: 30, //슬라이드 사이 여백
  slidesPerView: 5 ,//한 화면에 몇개의 슬라이드가 모이는지 여부
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    //숨김처리
    promotionEl.classList.add('hide');
  } else {
    //보임처리
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(selector, //선택자
    random(1.5, 2.5),  //애니메이션 동작 시간
  { //옵션
    y:size , //y축으로 이동(위아래)
    repeat: -1, //무한반복
    yoyo: true, //위아래로 반복
    ease: Power1.caseInOut, //애니매이션ease함수
    delay:random(0, delay) //지연시간
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8, //0~1사이 스크롤에서 화면 범위
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});