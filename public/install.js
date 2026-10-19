/* Browser-controlled installation: never request unrelated permissions. */
(function () {
  'use strict';
  let deferredPrompt=null;
  const dismissedKey='buildwell-install-dismissed-v2';
  const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  const iOS=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
  const isSafari=()=>/Safari/.test(navigator.userAgent)&&!/CriOS|FxiOS|EdgiOS|OPiOS/.test(navigator.userAgent);
  function makeInstallBanner() {
    if(standalone()||sessionStorage.getItem(dismissedKey))return;
    let el=document.getElementById('pwa-install-banner');
    if(el)return;
    el=document.createElement('div');el.id='pwa-install-banner';el.className='install-banner';
    const description=iOS()?'To add Buildwell, tap Share in Safari and choose “Add to Home Screen”.':'Open Buildwell like an app, right from your home screen.';
    el.innerHTML='<div class="install-icon"><img src="/icons/buildwell-192.png" alt="" /></div><div class="install-copy"><strong>Take Buildwell with you</strong><span>'+description+'</span></div><button type="button" class="install-action">'+(iOS()?'How to':'Install')+'</button><button type="button" class="install-close" aria-label="Not now">×</button>';
    el.querySelector('.install-close').addEventListener('click',()=>{sessionStorage.setItem(dismissedKey,'yes');el.remove();});
    el.querySelector('.install-action').addEventListener('click',async()=>{
      if(deferredPrompt){const p=deferredPrompt;deferredPrompt=null;p.prompt();await p.userChoice.catch(()=>({}));el.remove();return;}
      if(iOS()){
        let hint=document.getElementById('pwa-ios-guide');
        if(!hint){hint=document.createElement('div');hint.id='pwa-ios-guide';hint.className='pwa-ios-guide';hint.innerHTML='<div><strong>Add Buildwell to your iPhone</strong><p>1. Open this page in Safari.</p><p>2. Tap <strong>Share</strong> (the square with an upward arrow).</p><p>3. Choose <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.</p><button type="button">Got it</button></div>';document.body.appendChild(hint);hint.querySelector('button').addEventListener('click',()=>hint.remove());}
        return;
      }
      el.querySelector('.install-copy span').textContent='Use your browser menu and select “Install app” or “Add to Home Screen” if available.';
    });
    document.body.appendChild(el);
  }
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event; if(!sessionStorage.getItem(dismissedKey))setTimeout(makeInstallBanner,2600);});
  window.addEventListener('appinstalled',()=>{deferredPrompt=null;document.getElementById('pwa-install-banner')?.remove();});
  window.addEventListener('load',()=>{
    if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('/sw.js').catch(()=>{});
    if(matchMedia('(max-width: 720px)').matches&&!standalone()&&!sessionStorage.getItem(dismissedKey))setTimeout(makeInstallBanner,iOS()?6500:5000);
  });
})();
