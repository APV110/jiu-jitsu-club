function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateConsultationForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
        const value = field.value.trim();
        field.classList.remove('error');

        if (!value) {
            field.classList.add('error');
            isValid = false;
            return;
        }

        if (field.type === 'email' && !validateEmail(value)) {
            field.classList.add('error');
            isValid = false;
        }
    });

    return isValid;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-menu a[href$=".html"]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    const consultationForms = document.querySelectorAll('[data-consultation-form]');
    consultationForms.forEach((form) => {
        const confirmation = form.querySelector('[data-form-confirmation]');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!validateConsultationForm(form)) {
                return;
            }

            if (confirmation) {
                confirmation.classList.remove('hidden');
                confirmation.textContent = 'Thanks for requesting a consultation. We will follow up within one business day to confirm your next steps.';
            }

            form.reset();
        });
    });
});
