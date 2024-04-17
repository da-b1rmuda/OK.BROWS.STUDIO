import "./style.scss";

function AboutMe() {
  return (
    <div className="AboutMe-container" id="aboutMeSection">
      <div className="AboutMe-title">
        <img src="assets/ellipse1.png" alt="photo-about-me" />
        <h1>// ABOUT ME</h1>
      </div>
      <div className="AboutMe-inline-paddings">
        <div className="AboutMe-text">
          <div className="AboutMe-text__info">
            <p style={{ marginBottom: "20px" }}>Привет,</p>
            <p style={{ marginBottom: "20px" }}>
              уже больше 4 лет в своем блоге я транслирую искусство:
            </p>
            <p>— создаю прекрасные брови и делаю атмосыерные фотографии</p>
            <p>— смогу организовать съемку </p>
            <p>— покажу как жержать кисть</p>
          </div>
          <div className="AboutMe-text__name">
            <p>Elizaveta Utkina</p>
            <p>мастер-бровист</p>
          </div>
        </div>
        <div className="AboutMe-photo">
          <img src="assets/photo-about-me.png" alt="photo-about-me" />
        </div>
        <div className="AboutMe-photoText">
          <p>здесь - с любовью и душой</p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
