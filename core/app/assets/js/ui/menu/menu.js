import './menu.scss';
import Button from '../molecules/button';
import router from '@elementor/router';
import { Link, Match, LocationProvider } from '@reach/router';

export default function Menu( props ) {
	const ActionButton = ( itemProps ) => {
		if ( ! props.actionButton ) {
			return '';
		}

		return props.actionButton( itemProps );
	};

	return (
		<LocationProvider history={ router.appHistory }>
			<nav className="eps-menu">
				<ul>
				{ props.children }
				{ (
					props.menuItems.map( ( item ) => (
						<Match key={ item.type } path={ item.url }>
							{ ( { match } ) => {
								return (
								<li key={item.type} className={`eps-menu-item${ match ? ' eps-menu-item--active' : '' }`}>
									<Button text={item.title} className="eps-menu-item__link" {...item} />
									<ActionButton {...item} />
								</li> );
							} }
						</Match>
					) )
				) }
				</ul>
			</nav>
		</LocationProvider>
	);
}

Menu.propTypes = {
	menuItems: PropTypes.arrayOf( PropTypes.object ),
	children: PropTypes.object,
	actionButton: PropTypes.func,
};