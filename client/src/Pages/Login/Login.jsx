import { Button, Form, Input, message } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../../App/Context/UserInfoContext/UserInfoContext.jsx'
import { userAPI } from '../../Entities/User/api/service'
import './style.scss'

function Login() {
	const [messageApi, contextHolder] = message.useMessage()
	const { setUserData } = useContext(UserInfoContext)
	const [login, {}] = userAPI.useLoginMutation()
	const navigate = useNavigate()

	const onRegistration = () => {
		navigate('/registration')
	}

	const onBackHome = () => {
		navigate('/')
	}

	const onFinish = async values => {
		const user = await login(values)
		if (user.error) return isError(user.error.data.message)
		setUserData(user?.data[0])
		localStorage.setItem('userData', JSON.stringify(user?.data[0]))
		navigate('/')
	}

	const isError = messageError => {
		messageApi.open({
			type: 'error',
			content: messageError,
		})
	}

	return (
		<>
			{contextHolder}
			<div className='Login-container'>
				<div className='Login-content'>
					<div style={{ width: '50%' }}>
						<div className='Login-title'>
							<h1>// ENTRANCE</h1>
						</div>
						<div className='login-form'>
							<Form
								labelCol={{
									span: 8,
								}}
								wrapperCol={{
									span: 16,
								}}
								style={{
									maxWidth: 600,
								}}
								onFinish={onFinish}
								layout='vertical'
							>
								<Form.Item
									label='Телефон или Email'
									name='login'
									rules={[
										{
											required: true,
											message: 'Пожалуйста введите номер телефон или Email!',
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label='Пароль'
									name='user_password'
									rules={[
										{
											required: true,
											message: 'Пожалуйста введите пароль!',
										},
									]}
								>
									<Input.Password />
								</Form.Item>
								<Form.Item>
									<div className='Login-form-buttons'>
										<Button type='primary' htmlType='submit'>
											Войти
										</Button>
										<a onClick={onRegistration}>Зарегистрироваться</a>
									</div>
								</Form.Item>
							</Form>
						</div>
					</div>
					<div>
						<img src='/assets/ellipse3.png' />
					</div>
				</div>
				<div
					style={{
						justifyContent: 'end',
						display: 'flex',
					}}
				></div>
			</div>
		</>
	)
}

export default Login
