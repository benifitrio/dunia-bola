function showLoader() {
  const Content = document.getElementById('Content');
  const title = document.getElementById('headerTitle');
  Content.innerHTML = '';
  title.innerHTML = '';
  const html = `<div style="padding: 35% 20%; height: 50%;">
                  <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-layer ">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div><div class="gap-patch">
                        <div class="circle"></div>
                      </div><div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>
                  </div>
                </div>`;
  document.getElementById('loader').innerHTML = html;
}

function hideLoader() {
  document.getElementById('loader').innerHTML = '';
}

export { showLoader, hideLoader };
