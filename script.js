// Cornerways site — tab navigation, no page reloads, no dependencies.
(function(){
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.tab-btn'));
  var panels  = Array.prototype.slice.call(document.querySelectorAll('.tab-panel'));

  function activate(name, scrollToId){
    var found = false;
    buttons.forEach(function(b){
      var isActive = b.dataset.tab === name;
      if (isActive) found = true;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    if (!found) return; // unknown tab name — leave things as they are
    panels.forEach(function(p){
      p.hidden = p.dataset.panel !== name;
    });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    if (scrollToId){
      // wait a tick for the panel to un-hide before measuring position
      requestAnimationFrame(function(){
        var target = document.getElementById(scrollToId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  function routeFromHash(){
    var hash = window.location.hash.replace('#', '');
    if (!hash){ activate('home'); return; }
    var parts = hash.split('/'); // e.g. explore/climbing
    activate(parts[0], parts[1]);
  }

  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      window.location.hash = btn.dataset.tab;
    });
  });

  // Any in-page link like href="#explore/climbing" also routes through here
  window.addEventListener('hashchange', routeFromHash);
  routeFromHash();
})();
