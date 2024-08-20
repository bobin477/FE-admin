import {Input, Modal, notification} from "antd";
import React, {useEffect, useState} from "react";
import {IUser} from "./UserTable.tsx";

interface IProps {
    token: string;
    getData: any;
    isUpdateModalOpen: boolean
    setIsUpdateModalOpen: (isOpen: boolean) => void
    dataUpdate: null | IUser
    setUserData: React.Dispatch<React.SetStateAction<IUser | null>>
}


const UpdateModalUser = (props: IProps) => {
    const {token, getData, isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setUserData} = props;
    console.log(dataUpdate)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setRole(dataUpdate.role);
            setPassword(dataUpdate.password);
            setAddress(dataUpdate.address);
            setGender(dataUpdate.gender);
            setAge(dataUpdate.age);
        }
    }, [dataUpdate]);

    const handleOk = async () => {
        const data = {
            _id: dataUpdate?._id,
            name, email, role, password, age, address, gender
        }

        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "PATCH",
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
            await getData()
            notification.success({
                message: "Update thanh cong"
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
        setUserData(null);
        setIsUpdateModalOpen(false);
        setName('');
        setEmail('');
        setRole('');
        setPassword('');
        setAddress('');
        setGender('');
        setAge('');
    }

    return <div>
        <Modal title="Update User" open={isUpdateModalOpen} onOk={handleOk} onCancel={handleCloseCreateModal}
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
                <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                       disabled={true}/>
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

export default UpdateModalUser;