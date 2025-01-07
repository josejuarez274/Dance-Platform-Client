import React, { useContext, useState } from "react";
import { ModalOverlay, Background, Button, Form, GlassPanel, Input, SwitchText } from "../styles";

import AuthService from "api/services/AuthService";
import AuthContext from "providers/Auth/AuthContext";

import UserContext from "providers/User/UserContext";
import UserService from "api/services/userService";

interface RegisterProps {
    onClose: () => void;
}

const Register = ({ onClose }: RegisterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { setToken } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !firstName || !lastName || !phoneNumber) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        try {
            const registerResponse = await AuthService.register({
                email,
                password,
                firstName,
                lastName,
                phone: phoneNumber,
            });
            const { data: { token } } = registerResponse;
            setToken(token);

            const userResponse = await UserService.fetchUserData(token);
            const { data } = userResponse;
            setUser(data);

            setErrorMessage("");
            onClose();
        } catch (e) {
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    return (
        <ModalOverlay>
            <Background />
            <GlassPanel>
                <Form>
                    <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <Button onClick={handleRegister}>
                        <i className="fa fa-user-plus"></i> Register
                    </Button>
                    <SwitchText>
                        Already have an account? <a href="#" onClick={onClose}>Login</a>
                    </SwitchText>
                </Form>
                <Button onClick={onClose} style={{ marginTop: "20px" }}>
                    Close
                </Button>
            </GlassPanel>
        </ModalOverlay>
    );
};

export default Register;
