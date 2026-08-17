import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import fs from 'fs/promises';
import path from 'path';
import { ContactMessage } from '@/types';

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validatedData = contactSchema.parse(body);

    const contactsFilePath = path.join(process.cwd(), 'data', 'contacts.json');
    const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts: ContactMessage[] = JSON.parse(contactsData);

    const newContact: ContactMessage = {
      id: (contacts.length + 1).toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    contacts.push(newContact);

    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch {
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
}
