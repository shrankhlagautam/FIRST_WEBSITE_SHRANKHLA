const QUESTIONS = [
  { q: "The angle of incidence is always measured from:", options: ["Mirror surface","Normal to surface","Principal axis","Reflecting surface"], answer: 1, explanation: "Angles of incidence and reflection are always measured from the normal (perpendicular) to the reflecting surface." },
  { q: "Which mirror is used as a rear-view mirror in vehicles?", options: ["Concave mirror","Plane mirror","Convex mirror","Both A and C"], answer: 2, explanation: "Convex mirrors give a wider field of view and always form virtual, erect, diminished images — ideal for rear-view mirrors." },
  { q: "The focal length of a concave mirror of radius of curvature 30 cm is:", options: ["60 cm","30 cm","15 cm","10 cm"], answer: 2, explanation: "Focal length f = R/2 = 30/2 = 15 cm." },
  { q: "An object is placed at the centre of curvature of a concave mirror. The image formed is:", options: ["Virtual, erect, same size","Real, inverted, same size","Real, inverted, enlarged","Virtual, erect, diminished"], answer: 1, explanation: "When u = 2f (centre of curvature), image forms at 2f on same side — real, inverted, same size." },
  { q: "The magnification produced by a plane mirror is:", options: ["+2","-1","+1","0"], answer: 2, explanation: "A plane mirror produces magnification m = +1 (image same size as object, virtual and erect)." },
  { q: "Which phenomenon causes a stick to appear bent when placed in water?", options: ["Reflection","Diffraction","Refraction","Total internal reflection"], answer: 2, explanation: "Refraction — light bends as it passes from water (denser) to air (rarer), making the stick appear bent." },
  { q: "The speed of light in vacuum is approximately:", options: ["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], answer: 1, explanation: "Speed of light in vacuum c ≈ 3×10⁸ m/s." },
  { q: "Refractive index of a medium is defined as:", options: ["Speed of light in medium / Speed in vacuum","Speed of light in vacuum / Speed in medium","Wavelength in vacuum / Wavelength in medium","Both B and C"], answer: 3, explanation: "n = c/v = λ_vacuum/λ_medium. Both definitions give the same value." },
  { q: "The refractive index of diamond is 2.42. What does this mean?", options: ["Light travels 2.42× faster in diamond","Light travels 2.42× slower in diamond","Diamond reflects 2.42× more light","None of these"], answer: 1, explanation: "n = c/v, so v = c/n. Light travels 2.42 times slower in diamond than in vacuum." },
  { q: "Total internal reflection occurs when:", options: ["Light goes from rarer to denser medium","Angle of incidence exceeds critical angle in a denser medium","Angle of refraction is 90°","Light travels parallel to the surface"], answer: 1, explanation: "TIR occurs when light travels from a denser medium and the angle of incidence exceeds the critical angle." },
  { q: "Which colour of light has the highest speed in glass?", options: ["Violet","Blue","Red","All same"], answer: 2, explanation: "Red light has the highest speed in glass because it has the lowest refractive index in glass among visible colours." },
  { q: "A convex lens is also called a:", options: ["Diverging lens","Converging lens","Plane lens","Biconcave lens"], answer: 1, explanation: "A convex lens converges parallel rays to a focal point — hence called a converging lens." },
  { q: "The power of a lens of focal length 25 cm is:", options: ["25 D","4 D","0.25 D","-4 D"], answer: 1, explanation: "P = 1/f(metres) = 1/0.25 = 4 D (diopters). Positive for converging lens." },
  { q: "A concave lens always forms an image that is:", options: ["Real, inverted, enlarged","Virtual, erect, diminished","Real, erect, same size","Virtual, inverted, enlarged"], answer: 1, explanation: "A concave (diverging) lens always forms a virtual, erect, and diminished image regardless of object position." },
  { q: "The SI unit of power of a lens is:", options: ["Metre","Centimetre","Dioptre","Watt"], answer: 2, explanation: "Power of a lens is measured in Dioptre (D), where 1 D = 1 m⁻¹." },
  { q: "When object is placed between F and optical centre of a convex lens, image is:", options: ["Real and inverted","Virtual, erect, enlarged","Real, inverted, diminished","At infinity"], answer: 1, explanation: "When object is between F and optical centre (u < f), the convex lens acts like a magnifying glass producing a virtual, erect, enlarged image." },
  { q: "Splitting of white light into its component colours is called:", options: ["Reflection","Refraction","Dispersion","Diffraction"], answer: 2, explanation: "Dispersion is the splitting of white light into its constituent colours (VIBGYOR) due to different refractive indices for different wavelengths." },
  { q: "The colour that deviates the most when white light passes through a prism is:", options: ["Red","Orange","Yellow","Violet"], answer: 3, explanation: "Violet light has the highest refractive index in glass and deviates the most through a prism." },
  { q: "A ray of light passes from air into water at 30°. The angle of refraction (n_water=1.33) is approximately:", options: ["22°","30°","45°","19°"], answer: 0, explanation: "sin θ₂ = sin 30°/1.33 = 0.5/1.33 ≈ 0.376, so θ₂ ≈ 22°." },
  { q: "The mirror formula is:", options: ["1/f = 1/v + 1/u","1/f = 1/v - 1/u","f = v + u","f = v × u"], answer: 0, explanation: "Mirror formula: 1/v + 1/u = 1/f, using New Cartesian sign convention." },
  { q: "For a concave mirror, focal length is:", options: ["Positive","Negative","Zero","Infinity"], answer: 1, explanation: "Using New Cartesian sign convention, focal length of a concave mirror is negative (focus is in front of mirror)." },
  { q: "Lens formula is:", options: ["1/f = 1/v + 1/u","1/f = 1/v - 1/u","1/f = 1/u - 1/v","f = v - u"], answer: 1, explanation: "Lens formula: 1/v - 1/u = 1/f, where all distances are measured from optical centre." },
  { q: "A concave mirror of focal length 10 cm forms image at -30 cm for object at -15 cm. Magnification is:", options: ["+2","-2","0.5","-0.5"], answer: 1, explanation: "m = -v/u = -(-30)/(-15) = -2. Negative sign means real, inverted. Magnitude 2 means enlarged." },
  { q: "Which of these is NOT a property of the image formed by a convex mirror?", options: ["Virtual","Erect","Enlarged","Diminished"], answer: 2, explanation: "Convex mirror always forms virtual, erect, and diminished images. It never forms enlarged images." },
  { q: "The critical angle for glass-air interface (n_glass = 1.5) is approximately:", options: ["30°","42°","45°","60°"], answer: 1, explanation: "sin C = 1/n = 1/1.5 = 0.667, so C ≈ 41.8° ≈ 42°." },
  { q: "Optical fibres work on the principle of:", options: ["Reflection","Refraction","Total internal reflection","Dispersion"], answer: 2, explanation: "Optical fibres use total internal reflection to transmit light signals over long distances with minimal loss." },
  { q: "Rainbow formation is due to:", options: ["Reflection only","Refraction only","Dispersion and total internal reflection","Diffraction"], answer: 2, explanation: "A rainbow is formed by dispersion (splitting of white light) and total internal reflection inside water droplets." },
  { q: "An object placed at the focus of a concave mirror forms image at:", options: ["Focus","Centre of curvature","Infinity","Between F and C"], answer: 2, explanation: "When object is at focus F (u = f), reflected rays are parallel and image forms at infinity." },
  { q: "The magnification of a lens is given by:", options: ["m = v/u","m = -v/u","m = u/v","m = f/u"], answer: 0, explanation: "For lenses, magnification m = v/u (unlike mirrors where m = -v/u)." },
  { q: "Which device uses a concave mirror to concentrate sunlight?", options: ["Periscope","Solar furnace","Kaleidoscope","Telescope eyepiece"], answer: 1, explanation: "Solar furnaces use large concave mirrors to concentrate sunlight at the focus to achieve very high temperatures." },
];

let currentQ = 0, score = 0, answered = false;

function renderQuestion() {
  const q = QUESTIONS[currentQ];
  const total = QUESTIONS.length;
  document.getElementById('q-num').textContent = `Question ${currentQ + 1} of ${total}`;
  document.getElementById('q-text').textContent = q.q;
  var pf = document.getElementById('quiz-progress-fill');
  if(pf) pf.style.width = ((currentQ / total) * 100) + '%';
  document.getElementById('score-display').textContent = `Score: ${score}/${currentQ}`;

  const optWrap = document.getElementById('q-options');
  optWrap.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-option';
    btn.textContent = `${String.fromCharCode(65+i)}. ${opt}`;
    btn.id = `opt-${i}`;
    btn.onclick = () => selectAnswer(i);
    optWrap.appendChild(btn);
  });

  const exp = document.getElementById('q-explanation');
  exp.className = 'q-explanation';
  exp.textContent = '';
  answered = false;

  document.getElementById('btn-next').style.display = 'none';
  document.getElementById('btn-submit').style.display = 'inline-flex';
  document.getElementById('btn-submit').disabled = true;
  var qcard = document.querySelector('.question-card');
  if(qcard) qcard.style.display = 'block';
  var qr = document.getElementById('quiz-result');
  if(qr) qr.style.display = 'none';
}

let selectedOpt = null;
function selectAnswer(i) {
  if (answered) return;
  selectedOpt = i;
  document.querySelectorAll('.q-option').forEach((b, idx) => {
    b.classList.toggle('selected', idx === i);
  });
  document.getElementById('btn-submit').disabled = false;
}

function submitAnswer() {
  if (answered || selectedOpt === null) return;
  answered = true;
  const q = QUESTIONS[currentQ];
  const opts = document.querySelectorAll('.q-option');
  opts.forEach(b => b.disabled = true);
  opts[selectedOpt].classList.remove('selected');
  if (selectedOpt === q.answer) {
    opts[selectedOpt].classList.add('correct');
    score++;
  } else {
    opts[selectedOpt].classList.add('wrong');
    opts[q.answer].classList.add('correct');
  }
  document.getElementById('score-display').textContent = `Score: ${score}/${currentQ + 1}`;
  const exp = document.getElementById('q-explanation');
  exp.textContent = '💡 ' + q.explanation;
  exp.classList.add('show');
  document.getElementById('btn-submit').style.display = 'none';
  document.getElementById('btn-next').style.display = 'inline-flex';
}

function nextQuestion() {
  currentQ++;
  selectedOpt = null;
  if (currentQ >= QUESTIONS.length) showResult();
  else renderQuestion();
}

function showResult() {
  var qcard = document.querySelector('.question-card');
  if(qcard) qcard.style.display = 'none';
  var r = document.getElementById('quiz-result');
  if(r) { r.style.display = 'block'; }
  var pct = Math.round((score / QUESTIONS.length) * 100);
  document.getElementById('result-score').textContent = score+'/'+QUESTIONS.length;
  document.getElementById('result-pct').textContent = pct+'%';
  var grade = pct>=90?['A+','Outstanding!','#34d399']:pct>=75?['A','Excellent!','#4f8ef7']:pct>=60?['B','Good Job!','#fbbf24']:pct>=40?['C','Keep Practicing','#fb923c']:['D','Needs Improvement','#f87171'];
  var el = document.getElementById('result-grade');
  if(el){el.textContent=grade[0];el.style.background=grade[2]+'22';el.style.color=grade[2];el.style.border='1px solid '+grade[2]+'44';}
  var rm = document.getElementById('result-msg');
  if(rm) rm.textContent = grade[1];
  var pf = document.getElementById('quiz-progress-fill');
  if(pf) pf.style.width='100%';
}

function restartQuiz() {
  currentQ = 0; score = 0; selectedOpt = null; answered = false;
  var qr = document.getElementById('quiz-result');
  if(qr) qr.style.display = 'none';
  renderQuestion();
}

document.addEventListener('DOMContentLoaded', function() {
  renderQuestion();
  var bs = document.getElementById('btn-submit');
  var bn = document.getElementById('btn-next');
  if(bs) bs.onclick = submitAnswer;
  if(bn) bn.onclick = nextQuestion;
});
