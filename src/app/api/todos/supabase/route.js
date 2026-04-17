import { NextResponse } from 'next/server';
import { supabase } from '@/lib/superbase';

// GET: fetch all todos
export async function GET() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true, data });
}

// POST: add new todo
export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from("todos").insert([body]);
    if (error) throw error;
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT: update todo
export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();
    const { data, error } = await supabase.from("todos").update(updates).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: remove todo
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
