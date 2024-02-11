using System.Text.RegularExpressions;

namespace ContactOrganizer.Utils
{
    public class StringUtils
    {

        public static bool IsEmailValid(string email)
        {
            string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            Regex regex = new Regex(emailPattern);
            return regex.IsMatch(email);
        }

        public static bool IsPhoneValid(string phoneNumber)
        {
            string lettersPattern = @"[a-zA-Z]";
            Regex regex = new Regex(lettersPattern);
            bool isValid = !regex.IsMatch(phoneNumber);
            return isValid;
        }
    }
}
