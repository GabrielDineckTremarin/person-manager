using System.Globalization;

namespace ContactOrganizer.Utils
{
    public class Date_Utils
    {

        public static DateTime GetDateOnly(DateTime input)
        {
            if (input == null)
                throw new Exception("Object to parse is null");

            return DateTime.SpecifyKind(DateTime.ParseExact(input.ToString("dd/MM/yyyy"), "dd/MM/yyyy", CultureInfo.InvariantCulture), DateTimeKind.Local);
        }
    }
}
