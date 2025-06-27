'use client';

import { useState } from 'react';
import { User } from '../types/User';

interface Props {
  onClose: () => void;
  onAddUser: (user: User) => void;
}

export default function CreateUserModal({ onClose, onAddUser }: Props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    department: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (!formData.age || isNaN(Number(formData.age))) newErrors.age = 'Valid age is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const newUser: User = {
      id: Date.now(), // mock ID
      ...formData,
      age: parseInt(formData.age),
      email: formData.email,
      department: formData.department,
      phone: '000-000-0000',
      performance: Math.ceil(Math.random() * 5),
      bio: 'Newly created user.',
      pastPerformance: [3, 4, 5, 4],
      address: { address: 'Unknown', city: 'Unknown' },
    };
    onAddUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>

        <div className="space-y-3">
          {['firstName', 'lastName', 'email', 'age', 'department'].map((field) => (
            <div key={field}>
              <input
                type="text"
                placeholder={field}
                className="w-full px-3 py-2 border rounded"
                value={(formData as any)[field]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [field]: e.target.value }))
                }
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
        </div>
      </div>
    </div>
  );
}

