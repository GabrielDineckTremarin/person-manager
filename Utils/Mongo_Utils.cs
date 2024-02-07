using MongoDB.Bson;

namespace ContactOrganizer.Utils
{
    public class Mongo_Utils
    {
        public static bool IsObjectId(string id)
        {
            return ObjectId.TryParse(id, out ObjectId obj);
        }

    }
}
