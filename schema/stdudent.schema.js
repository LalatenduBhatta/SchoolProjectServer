import { Schema } from "mongoose";

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [3, 'Full name must be at least 3 characters long'],
        maxlength: [100, 'Full name must be less than 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: 'Please enter a valid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth date is required'],
    },
    joiningDate: {
        type: Date,
        required: [true, 'Joining date is required'],
    },
    class: {
        type: String,
        required: [true, 'Class is required'],
        enum: ['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    },
    parentDetails: {
        fatherName: {
            type: String,
            required: [true, "Father's name is required"],
            trim: true,
        },
        motherName: {
            type: String,
            required: [true, "Mother's name is required"],
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: [true, 'Parent phone number is required'],
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v);
                },
                message: 'Please enter a valid 10-digit phone number',
            },
        },
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        state: {
            type: String,
            required: [true, 'State is required'],
        },
        zipCode: {
            type: String,
            required: [true, 'Zip code is required'],
            validate: {
                validator: function (v) {
                    return /^\d{5,6}$/.test(v);
                },
                message: 'Please enter a valid zip code',
            },
        },
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other'],
    },
    courseFees: {
        total: {
            type: Number,
            required: [true, 'Total course fee is required'],
            min: [0, 'Total fee must be a positive number'],
        },
        paid: {
            type: Number,
            required: [true, 'Paid fee is required'],
            min: [0, 'Paid fee must be a positive number'],
            validate: {
                validator: function (v) {
                    return v <= this.courseFees.total;
                },
                message: 'Paid fee cannot exceed total fee',
            },
        },
        pending: {
            type: Number,
            default: function () {
                return this.courseFees.total - this.courseFees.paid;
            },
            validate: {
                validator: function (v) {
                    return v >= 0;
                },
                message: 'Pending fee cannot be negative',
            },
        },
    },
}, {
    timestamps: true,
});


export default studentSchema