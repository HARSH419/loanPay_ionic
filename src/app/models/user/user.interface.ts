export interface userInterface {
    id: number;
    name: string,
    email: string,
    mobile: number,
    user_type: string,
    login_id: number,
    status: number,
    image: string,
    address: string,
    aadhar_number: string,
    aadhar_front_image: string,
    aadhar_back_image: string,
    pan_number: string,
    pan_card_image: string,
    email_verified_at: string,
}

export interface IUserClass{
    user: userInterface;
    token: string;
}