import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { submitContact } from '../services/api';
import { useSiteSettings } from '../contexts/site-settings-context';
import type { SiteSettings } from '../services/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const settings = useSiteSettings() as SiteSettings;

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg('请填写姓名和联系电话');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      // NOTE: 直接通过 supabase-js 写入数据库，无需后端
      await submitContact(formData);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      setErrorMsg('提交失败，请稍后重试或直接联系客服微信。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl w-full max-w-4xl max-h-full relative shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200 flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
        >
          <X size={20} className="text-slate-500" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto flex-1 pb-safe">
          {/* Form Section */}
          <div className="flex-1 p-6 sm:p-8 md:p-12 relative">
            <h3 className="text-2xl md:text-3xl font-black mb-2 pr-8">预约咨询</h3>
            <p className="text-slate-500 text-sm mb-6 md:mb-8">填写以下信息，我们的专业艺术顾问将会在 24 小时内与您联系，为您定制专属作品集方案。</p>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center h-64 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                <CheckCircle size={48} className="text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">提交成功！</h4>
                <p className="text-sm text-slate-500 mb-6">我们已收到您的留言，顾问将尽快与您联系。</p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  继续留言
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">姓名 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="请输入您的真实姓名"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">联系电话 *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="请输入您的手机号码"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">留言内容 (选填)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm resize-none"
                    placeholder="请简要描述您的目标院校或专业意向"
                  />
                </div>

                {errorMsg && <p className="text-red-500 text-sm font-medium">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-background-dark py-3.5 md:py-4 rounded-xl font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? '提交中...' : '提交预约'}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            )}
          </div>

          {/* Info Section */}
          <div className="w-full md:w-[320px] bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 md:p-12 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 flex flex-col xl:shrink-0">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">直接联系我们</h4>

            <div className="space-y-5 md:space-y-6 flex-1">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">联系电话</div>
                  <div className="font-medium text-sm">{settings.contact_phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">电子邮箱</div>
                  <div className="font-medium text-sm">{settings.contact_email}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">微信号</div>
                  <div className="font-medium text-sm">{settings.contact_wechat}</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 md:pt-8 md:mt-8 border-t border-slate-200 dark:border-slate-700 flex justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-2">
                  {settings.qr_wechat ? (
                    <img src={settings.qr_wechat} alt="WeChat QR Code" className="w-full h-full object-cover rounded" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center rounded">
                      <span className="text-slate-400 text-xs text-center px-4">QR Code</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-500 font-medium">扫码添加客服微信</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
