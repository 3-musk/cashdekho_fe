import { emailValidation } from "../utils/validations";
import { errorAlert, successAlert } from "../utils/alerts";
import { signupWithEmail } from '../services/user';
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;

        console.log("handleSubmit", firstName, lastName, email, phone, password)

        if(firstName==="" || lastName==="" || email==="" || phone==="" || password==="")
        {
            errorAlert("All fields are required.");
            return;
        }

        if(emailValidation(email)==false)
        {
            errorAlert("Enter a valid Email.");
            return;
        }

        if (phone.length !== 10)
        {
            errorAlert("Enter a valid Phone Number.");
            return;
        }

        const response = await signupWithEmail(email, password, firstName, lastName, phone);
        
        if(response && response.status)
            {
                successAlert("Account created successfully. Please login to continue.")
                navigate("/login");
            }
            else if(response && response.status == false && response.error)
            {
                errorAlert(response.error);
            }
            else
            {
                errorAlert("Error Creating Account.")
            }
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md login-signup-form">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="w-full px-4 py-2 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className="w-full px-4 py-2 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className="w-full px-4 py-2 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-200"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;