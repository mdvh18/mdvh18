function acceptAge() {
    localStorage.setItem('age_verified_gh', 'true');
    document.getElementById('age-gate-overlay').style.display = 'none';
}

window.onload = function() {
    if (localStorage.getItem('age_verified_gh') === 'true') {
        document.getElementById('age-gate-overlay').style.display = 'none';
    } else {
        document.getElementById('age-gate-overlay').style.display = 'flex';
    }
};
