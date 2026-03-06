import React from "react";
import { auth, db } from "@/src/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from "firebase/firestore";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { LogIn, LogOut, Plus, Edit, Trash2 } from "lucide-react";

export default function Admin() {
  const [user, setUser] = React.useState<any>(null);
  const [posts, setPosts] = React.useState<any[]>([]);
  const [leads, setLeads] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<'posts' | 'leads'>('posts');

  const [newPost, setNewPost] = React.useState({ title: '', slug: '', excerpt: '', content: '', published: false });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const postsQ = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const postsSnap = await getDocs(postsQ);
      setPosts(postsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const leadsQ = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      const leadsSnap = await getDocs(leadsQ);
      setLeads(leadsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, "posts"), {
        ...newPost,
        authorId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setNewPost({ title: '', slug: '', excerpt: '', content: '', published: false });
      fetchData();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Check console.");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      fetchData();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={handleLogin} className="w-full gap-2">
              <LogIn className="h-4 w-4" /> Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">{user.email}</span>
            <Button variant="outline" onClick={handleLogout} size="sm" className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-800 pb-4">
          <Button 
            variant={activeTab === 'posts' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('posts')}
          >
            Blog Posts
          </Button>
          <Button 
            variant={activeTab === 'leads' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('leads')}
          >
            Leads
          </Button>
        </div>

        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <Input 
                      placeholder="Title" 
                      value={newPost.title} 
                      onChange={e => setNewPost({...newPost, title: e.target.value})} 
                      required 
                    />
                    <Input 
                      placeholder="Slug (e.g. my-post)" 
                      value={newPost.slug} 
                      onChange={e => setNewPost({...newPost, slug: e.target.value})} 
                      required 
                    />
                    <Textarea 
                      placeholder="Excerpt" 
                      value={newPost.excerpt} 
                      onChange={e => setNewPost({...newPost, excerpt: e.target.value})} 
                      required 
                    />
                    <Textarea 
                      placeholder="Markdown Content" 
                      value={newPost.content} 
                      onChange={e => setNewPost({...newPost, content: e.target.value})} 
                      className="min-h-[200px]"
                      required 
                    />
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="published" 
                        checked={newPost.published} 
                        onChange={e => setNewPost({...newPost, published: e.target.checked})} 
                      />
                      <label htmlFor="published">Published</label>
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      <Plus className="h-4 w-4" /> Create Post
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Existing Posts</h2>
              {posts.map(post => (
                <Card key={post.id} className="bg-slate-900/50">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-white">{post.title}</h3>
                      <p className="text-sm text-slate-400">/{post.slug} • {post.published ? 'Published' : 'Draft'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Contact Leads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leads.map(lead => (
                <Card key={lead.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-white text-lg">{lead.name}</h3>
                        <a href={`mailto:${lead.email}`} className="text-indigo-400 text-sm hover:underline">{lead.email}</a>
                      </div>
                      <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Business Type</span>
                      <p className="text-sm text-slate-300">{lead.businessType}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Problem</span>
                      <p className="text-sm text-slate-300 mt-1 bg-slate-950 p-3 rounded-md border border-slate-800">{lead.problem}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {leads.length === 0 && (
                <p className="text-slate-400">No leads found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
