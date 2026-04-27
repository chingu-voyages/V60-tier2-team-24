const Firebase_Error_Messages: Record<string, string> = {
    //Email/Password errors
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Please enter an valid email address.",
    "auth/weak-password": "Password is too weak. Use at least 8 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your internet connection.",
  
//Google OAuth errors
    "auth/popup-blocked": "Popup was blocked. Please allow popups for this site.",
    "auth/popup-closed-by-user": "",  // empty = don't show anything
    "auth/cancelled-popup-request": "",
    "auth/account-exists-with-different-credential":
    "An account already exists with this email using a different sign-in method.",
};
export function getFirebaseErrorMessage(errorCode: string): string | null{
    const message = Firebase_Error_Messages[errorCode];

    if (message === "") return null;
    if (message) return message;

    return "Something went wrong. Please try again.";
}
