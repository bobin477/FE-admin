import  { useState } from 'react';
import { PauseCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link to={"/"}>
            Home
        </Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/user"}>
            User
        </Link>,
        key: 'user',
        icon: <UserOutlined />,
    },
    {
        label: <Link to={"/track"}>
            Track
        </Link>,
        key: 'track',
        icon:<PauseCircleOutlined />,
    },

];

const Header = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />);
}

export default Header