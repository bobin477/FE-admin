import {Input, Modal, notification} from "antd";
import {useState} from "react";

interface IProps {
    token: string;
    getData: any;
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (isOpen: boolean) => void
}


const UserModalCreate = (props: IProps) => {
    const {token, getData, isCreateModalOpen, setIsCreateModalOpen} = props;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')

    const handleOk = async () => {
        const data = {
            name, email, role, password, age, address, gender
        }

        console.log(data);


        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...data
            })
        })
        const d = await res.json();

        if (d.data) {
            getData()
            notification.success({
                message: "Tao thanh cong"
            })
            handleCloseCreateModal();
        } else {
            notification.error(
                {
                    message: "Co loi xay ra",
                    description: JSON.stringify(d.message)
                }
            )
        }


    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        setName('');
        setEmail('');
        setRole('');
        setPassword('');
        setAddress('');
        setGender('');
        setAge('');
    }

    return <div>
        <Modal title="Create User" open={isCreateModalOpen} onOk={handleOk} onCancel={handleCloseCreateModal}
               maskClosable={false}>
            <div>
                <label>Name</label>
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label>
                    Email
                </label>
                <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <label>Age</label>
                <Input placeholder="Age" value={age} onChange={e => setAge(e.target.value)}/>
            </div>
            <div>
                <label>Gender</label>
                <Input placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)}/>
            </div>
            <div>
                <label>Address</label>
                <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)}/>
            </div>
            <div>
                <label>Role</label>
                <Input placeholder="Role" value={role} onChange={e => setRole(e.target.value)}/>
            </div>
        </Modal>
    </div>
}

export default UserModalCreate;