// When the DOM is ready
$(function() {
  
  // Init ScrollMagic Controller
  var scrollMagicController = new ScrollMagic();
  // Create Animation for 0.5s
  var tween = TweenMax.to('#animation', 0.5, {
    backgroundColor: 'rgb(255, 39, 46)',
    scale: 5,
    rotation: 360,
    opacity:1,
    marginLeft:`20px`
  });
  // Create the Scene and trigger when visible
  var scene = new ScrollScene({
    triggerElement: '#scene',
    offset: 150 /* offset the trigger 150px below #scene's top */
  })
  .setTween(tween)
  .addTo(scrollMagicController);
  
  // Add debug indicators fixed on right side
   scene.addIndicators();
  
});


// TweenMax.to(selectorOfElementYouWantToAnimate, DurationOfAnimation, AnimationProperties);
// 예를 들어, 요소의 배경색을 기본값 에서 빨간색 으로 변경 하려면, 다음은 그 예입니다.
// var tween = TweenMax.to('#first-animation', 0.5, {backgroundColor: 'red'});
/**
 * var tween = TweenMax.to('#first-animation', 0.5, {
    backgroundColor: 'red',
    scale: 5,
    rotation: 360
});
 */

// var tween = TweenMax.from('#animation', 0.5, {
//   backgroundColor: 'rgb(255, 39, 46)',
//   scale: 5,
//   rotation: 360
// });

// var tween = TweenMax.fromTo('#animation', 0.5,
//     {
//         backgroundColor: 'rgb(255, 39, 46)',
//         scale: 5,
//         left: -400
//     },
//     {
//         scale: 1,
//         left: 400,
//         rotation: 360,
//         repeat: -1, /* Aka an infinite amount of repeats */
//         yoyo: true /* Make it go back and forth or not */
//     }
// );

// var tween = TweenMax.staggerFromTo('.animation', 0.5,
//     {
//         scale: 1,
//     },
//     {
//         backgroundColor: 'rgb(255, 39, 46)',
//         scale: 5,
//         rotation: 360
//     },
//     0.4 /* Stagger duration */
// );





// function widgetController() {
//   var e = window.innerHeight;
//   $(window).scroll(function () {
//     $(this).scrollTop() >= e ? $("#widget .std-btn").addClass("open") : $("#widget .std-btn").removeClass(
//       "open")
//   })
// }

// function headerController() {
//   $(window).scroll(function() {
//       1 <= $(this).scrollTop() ? $("header").addClass("scrolled") : $("header").removeClass("scrolled")
//   })
// }

// function ScrollControl() {
//   let e = window.innerHeight;
//   let $window = $(window);
//   $window.scroll(function() {
//     console.log(e);
//       $window.scrollTop() >= e ? $("#widget .std-btn").addClass("open") : $("#widget .std-btn").removeClass("open")
//   })
// }

// ScrollControl()

