import './style.scss'

function AboutMe() {
	return (
		<div className='AboutMe-container' id='aboutMeSection'>
			<div className='AboutMe-title'>
				<img src='assets/ellipse1.png' alt='photo-about-me' />
				<h1>// ABOUT ME</h1>
			</div>
			<div className='AboutMe-inline-paddings'>
				<div className='AboutMe-text'>
					<div className='AboutMe-text__info'>
						<p style={{ marginBottom: '20px' }}>Привет,</p>
						<p style={{ marginBottom: '20px' }}>уже более 2 лет я:</p>
						<p>— воплощаю мечты, создавая идеальные брови</p>
						<p>— делаю оформление бровей за 30 минут</p>
						<p>
							— помогаю людям выглядеть и чувствовать себя лучше, подчеркивая
							естественную красоту
						</p>
					</div>
					<div className='AboutMe-text__name'>
						<p>Elizaveta Utkina</p>
						<p>мастер-бровист</p>
					</div>
				</div>
				<div className='AboutMe-photo'>
					<img src='assets/photo-about-me.png' alt='photo-about-me' />
				</div>
				<div className='AboutMe-photoText'>
					<p>здесь - с любовью и душой</p>
				</div>
			</div>
		</div>
	)
}

export default AboutMe
