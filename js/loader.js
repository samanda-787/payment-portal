
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Imeshindwa kupakua ${filePath}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error('Hitilafu:', error);
    document.getElementById(elementId).innerHTML = `
      <div class="alert alert-warning m-3">
        Imeshindwa kupakia sehemu hii: ${filePath}
      </div>
    `;
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('navbar', 'components/navbar.html'),
    loadComponent('hero', 'components/hero.html'),
    loadComponent('stats', 'components/stats.html'),
    loadComponent('services', 'components/services.html'),
    loadComponent('payment-form', 'components/payment-form.html'),
    loadComponent('control-number', 'components/control-number.html'),
    loadComponent('recent-transactions', 'components/recent-transactions.html'),
    loadComponent('faq', 'components/faq.html'),
    loadComponent('contact', 'components/contact.html'),
    loadComponent('footer', 'components/footer.html')
  ]);

  initPaymentForm();
  initControlNumberForm();
  initSmoothScroll();
});


function initPaymentForm() {
  const form = document.getElementById('gepgForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const serviceType = document.getElementById('serviceType').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;

    if (!serviceType || !amount) {
      alert('Tafadhali jaza sehemu zote muhimu.');
      return;
    }

   
    console.log('Naomba control number:', { serviceType, amount, description });

   
    const fakeControlNumber = '9911' + Math.floor(Math.random() * 1000000);
    

    const cnSection = document.getElementById('generatedControlNumber');
    if (cnSection) {
      cnSection.textContent = fakeControlNumber;
      document.getElementById('controlNumberResult').classList.remove('d-none');
      document.getElementById('controlNumberResult').scrollIntoView({ behavior: 'smooth' });
    }

    form.reset();
  });
}


function initControlNumberForm() {
  const form = document.getElementById('lookupForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const cn = document.getElementById('lookupControlNumber').value;
    alert('Unatafuta Control Number: ' + cn + '\n(Hapa ungetuma kwa backend yako)');
  });
}


function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}