import Menu from './menu';
import SubMenu from './subMenu';
import MenuItem from './menuItem';
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubItem = SubMenu;
export default TransMenu;
