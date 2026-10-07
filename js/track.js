// Suivi des contacts : envoie un événement à Umami (si installé) à chaque clic sur Appeler / SMS.
// La source (ex. ?src=facebook) est mémorisée pour savoir d'où vient le visiteur.
(function(){
  var src='direct';
  try{
    var p=new URLSearchParams(location.search).get('src');
    if(p){sessionStorage.setItem('src',p)}
    src=sessionStorage.getItem('src')||'direct';
  }catch(e){}
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="tel:"],a[href^="sms:"]');
    if(!a)return;
    var type=a.getAttribute('href').indexOf('tel:')===0?'appel':'sms';
    if(window.umami&&window.umami.track){window.umami.track(type,{page:location.pathname,source:src})}
  });
})();
