import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../../Entities/User/api/service'
import './style.scss'

function Registration() {
	const [messageApi, contextHolder] = message.useMessage()
	const [registration, {}] = userAPI.useRegistrationMutation()
	const navigate = useNavigate()

	const onLogin = () => {
		navigate('/login')
	}

	const onBackHome = () => {
		navigate('/')
	}

	const onFinish = async values => {
		const user = await registration(values)
		if (user.error) return isError(user.error.data.message)
		isSuccess('Вы успешно зарегистрировались')
		const interval = setInterval(() => {
			navigate('/login')
			clearInterval(interval)
		}, 2000)
	}

	const isError = messageError => {
		messageApi.open({
			type: 'error',
			content: messageError,
		})
	}

	const isSuccess = messageSuccess => {
		messageApi.open({
			type: 'success',
			content: messageSuccess,
		})
	}
	return (
		<>
			{contextHolder}
			<div className='Registration-container'>
				<div className='Registration-content'>
					<div style={{ width: '50%' }}>
						<div className='Registration-title'>
							<h1>// REGISTRATION</h1>
						</div>
						<div className='Registration-form'>
							<Form
								name='login'
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
									label='Имя и фамилия'
									name='user_name'
									rules={[
										{
											required: true,
											message: 'Пожалуйста введите имя и фамилию!',
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label='Телефон'
									name='user_number_phone'
									rules={[
										{
											required: true,
											message: 'Пожалуйста введите номер телефон!',
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label='Email'
									name='user_email'
									rules={[
										{
											required: true,
											message: 'Пожалуйста введите почту!',
										},
										{
											type: 'email',
											message: 'Введена некорректная почта!',
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
								<Form.Item
									name='confirm'
									label='Подтверждение пароля'
									dependencies={['user_password']}
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Пожалуйста введите пароль повторно!',
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (
													!value ||
													getFieldValue('user_password') === value
												) {
													return Promise.resolve()
												}
												return Promise.reject(new Error('Пароли не совпадают!'))
											},
										}),
									]}
								>
									<Input.Password />
								</Form.Item>
								<Form.Item>
									<div className='Login-form-buttons'>
										<Button
											type='primary'
											htmlType='submit'
											style={{ marginTop: '10px' }}
										>
											Зарегистрироваться
										</Button>
										<a onClick={onLogin}>Войти</a>
									</div>
								</Form.Item>
							</Form>
						</div>
					</div>
					<div>
						<img src='/assets/ellipse3.png' />
					</div>
				</div>
				<div style={{ justifyContent: 'end', display: 'flex' }}></div>
			</div>
		</>
	)
}

export default Registration
