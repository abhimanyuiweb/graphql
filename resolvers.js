const User = require('./models/user.model');
const Comment = require('./models/comment.model');

const resolvers = {
    Query: {
        consoleTesting: async (_,) => {
            console.log('Log message1');

            return 'Testing';
        },
        getUser: async (_, { email }) => {
            const userDetail = await User.findOne({ email });
            userDetail.id = userDetail._id;
            return userDetail;
        },
        getAllUsers: async (_, { page, limit }) => {
            console.log('=========================\n');
            console.log('I am from get all users resolver\n');
            const totalRecords = await User.countDocuments();
            const skip = (page - 1) * limit;
            const users = await User.find()
                .skip(skip)
                .limit(limit)
                .sort({ name: 1 });

            return {
                "users": users,
                "totalUsers": totalRecords,
                "totalPages": Math.ceil(totalRecords / limit),
                "currentPage": page,
                "hasNextPage": page * limit < totalRecords,
                "hasPrevPage": page > 1
            };
        }
    },
    User: {
        comments: async (parent) => {
            console.log('I am from comments resolver:', parent.email);
            return await Comment.find({ email: parent.email }); // or parent._id if you're using userId
        }
    }
};

module.exports = resolvers;