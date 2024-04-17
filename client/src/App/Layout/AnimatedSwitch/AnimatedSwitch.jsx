import "./style.scss";
import {Outlet, useLocation} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export const AnimatedSwitch = () => {
	const location = useLocation();
	return (
			<TransitionGroup component={null}>
				<CSSTransition
						key={location.pathname}
						classNames="fade" // Имя класса для анимации
						timeout={500} // Продолжительность анимации
				>
					<div className="route-section">
						<Outlet/>
					</div>
				</CSSTransition>
			</TransitionGroup>
	);
};
