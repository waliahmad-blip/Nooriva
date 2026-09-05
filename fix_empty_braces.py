import re

file_path = r'C:\Nooriva\app\account\AccountClient.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (r'<NoorixAvatar size=\{\} />', '<NoorixAvatar size={28} />'),
    (r'<NoorixAvatar size=\{\} isTyping=\{\} />', '<NoorixAvatar size={28} isTyping={true} />'),
    (r'<NoorixAvatar size=\{\} isTyping=\{isTyping\} />', '<NoorixAvatar size={32} isTyping={isTyping} />'),
    (r'<User size=\{\} ', '<User size={14} '),
    (r'<Camera size=\{\} />', '<Camera size={16} />'),
    (r'<Camera size=\{\} className', '<Camera size={32} className'),
    (r'<Crown size=\{\} />', '<Crown size={10} />'),
    (r'<Sun size=\{\} ', '<Sun size={14} '),
    (r'<Moon size=\{\} ', '<Moon size={14} '),
    (r'<LogOut size=\{\} />', '<LogOut size={14} />'),
    (r'<Check size=\{\} className="text-green-500"', '<Check size={14} className="text-green-500"'),
    (r'<Check size=\{\} />', '<Check size={12} />'),
    (r'<item\.icon size=\{\} ', '<item.icon size={14} '),
    (r'<Trophy size=\{\} ', '<Trophy size={14} '),
    (r'<a\.icon size=\{\} />', '<a.icon size={18} />'),
    (r'<Copy size=\{\} />', '<Copy size={12} />'),
    (r'<Loader2 size=\{\} ', '<Loader2 size={14} '),
    (r'<Send size=\{\} />', '<Send size={14} />'),
    (r'<Mic size=\{\} />', '<Mic size={14} />'),
    (r'<Lock size=\{\} ', '<Lock size={14} '),
    (r'<X size=\{\} />', '<X size={16} />'),
    (r'onClick=\{\}', 'onClick={copyReferral}'),
    (r'onSubmit=\{\}', 'onSubmit={handleSendChat}'),
    (r'onChange=\{\}', 'onChange={handlePicUpload}'),
    (r'ref=\{\}', 'ref={chatEndRef}'),
    (r'value=\{\}', 'value={chatInput}'),
    (r'key=\{\}', 'key={i}'),
    (r'disabled=\{\}', 'disabled={isTyping}'),
    (r'msg=\{\} isDark=\{\}', 'msg={msg} isDark={isDark}'),
    (r'src=\{\}', 'src={profilePic}'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('All empty {} expressions fixed successfully!')
