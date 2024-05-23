import { contactInfo } from '../../Shared/contactInfo'
import { smoothScrollToSection } from '../../Shared/lib/smoothScrollToSection'
import './style.scss'

function Footer() {
	return (
		<>
			<div className='Footer-container' id='contactsSection'>
				<h1>
					{' '}
					<a href='/'>OK.BROWS</a>
				</h1>
				<div className='Footer-content'>
					<div className='Footer-place'>
						<p>{contactInfo.city}</p>
						<p>{contactInfo.street}</p>
						<p>{contactInfo.number_phone}</p>
					</div>
					<div className='Footer-links'>
						<div className='Footer-links-first'>
							<a href={contactInfo.instagram_link}>INSTAGRAM</a>
							<a href={contactInfo.telegram_link}>TELEGRAM</a>
							<a href={contactInfo.whatsapp_link}>WHATSAPP</a>
							<a href={contactInfo.vk_link}>VK</a>
							<a href='/references/operator.pdf' target='_blank'>
								REFERENCE
							</a>
						</div>
						<div className='Footer-links-second'>
							<a onClick={() => smoothScrollToSection('aboutMeSection')}>
								ABOUT ME
							</a>
							<a onClick={() => smoothScrollToSection('serviceSection')}>
								SERVICES
							</a>
							<a onClick={() => smoothScrollToSection('newsSection')}>NEWS</a>
							<a onClick={() => smoothScrollToSection('faqSection')}>FAQ</a>
							<a onClick={() => smoothScrollToSection('photoSection')}>PHOTO</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Footer
