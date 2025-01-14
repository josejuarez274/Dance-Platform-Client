import React, { useContext, useState } from "react";
import {
    ModalOverlay,
    Background,
    Button,
    Form,
    GlassPanel,
    Input,
    SwitchText,
    Spinner,
    InputWrapper,
    ToggleButton,
} from "../../styles";

import AuthService from "api/services/AuthService";
import AuthContext from "providers/Auth/AuthContext";

import UserContext from "providers/User/UserContext";
import UserService from "api/services/userService";

interface RegisterProps {
    onClose: () => void;
    onLogin: () => void;
}

const Register = ({ onClose, onLogin }: RegisterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { setToken } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !firstName || !lastName || !phoneNumber) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        setLoading(true);

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
        } finally {
            setLoading(false);
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
                    <InputWrapper>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ToggleButton onClick={(e) => {
                            e.preventDefault();

                            setShowPassword(!showPassword)}
                        }>
                            {showPassword ? "Hide" : "Show"}
                        </ToggleButton>
                    </InputWrapper>

                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <Button onClick={handleRegister} disabled={loading}>
                        { loading && <Spinner /> }
                        { loading ? "Registering..." : "Register" }
                    </Button>
                    <SwitchText>
                        Already have an account? <a href="#" onClick={onLogin}>Login</a>
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
